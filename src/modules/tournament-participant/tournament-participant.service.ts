import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Participant } from '../participants/participants.entity';
import { Tournament } from '../tournaments/tournaments.entity';
import { TournamentParticipant } from './tournament-participant.entity';
import { RegisterParticipantDto } from './dto/tournament-participant.dto';
import { EmailsService } from '../emails/emails.service';
import { getDatesAndTimesByTimeZone } from 'src/utils/date';

@Injectable()
export class TournamentParticipantsService {
  constructor(
    @Inject(forwardRef(() => EmailsService))
    private emailsService: EmailsService,
  ) {}
  async registerParticipantInTournament({
    tournamentId,
    participantData,
  }: RegisterParticipantDto): Promise<TournamentParticipant> {
    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    let participant = await Participant.findOne({
      where: { email: participantData.email },
    });

    let createdParticipant = false;
    if (!participant) {
      participant = await Participant.create({
        email: participantData.email,
        fullName: participantData.fullName,
        age: participantData.age,
        phone: participantData.phone,
      });
      createdParticipant = true;
    }

    let isParticipantNewByTournament = false;

    let tournamentParticipant = null;

    if (!createdParticipant) {
      tournamentParticipant = await TournamentParticipant.findOne({
        where: {
          tournamentId: tournamentId,
          participantId: participant.id,
        },
      });
    }

    if (tournamentParticipant) {
      tournamentParticipant;
    } else {
      tournamentParticipant = new TournamentParticipant();
      tournamentParticipant.userName = participantData.userName;
      tournamentParticipant.userId = participantData.userId;
      tournamentParticipant.tournamentId = tournamentId;
      tournamentParticipant.participantId = participant.id;
      tournamentParticipant.platform = participantData.platform;
      tournamentParticipant.save();
      isParticipantNewByTournament = true;
    }

    const sendEmailsByTotalParticipants = async (
      countParticipants: number,
      subject: string,
      template: string,
    ) => {
      const context = {
        fullName: participant.fullName,
        userName: tournamentParticipant.userName,
        name: tournament.name,
        game: tournament.game,
        entryFee: tournament.entryFee,
        datesAndTimes: getDatesAndTimesByTimeZone(tournament.dateTime),
      };
      if (countParticipants < tournament.maxParticipants) {
        console.log(countParticipants, tournament.maxParticipants);
        this.emailsService.sendMailService(
          participant.email,
          subject,
          template,
          context,
        );
      } else {
        tournament.status = 'Finished';
        await tournament.save();
        this.emailsService.sendMailService(
          participant.email,
          'Lo sentimos :(',
          'fullTournament',
          context,
        );
      }
    };

    if (isParticipantNewByTournament) {
      if (tournament.entryFee > 0) {
        const countParticipants = await TournamentParticipant.count({
          where: {
            tournamentId: tournamentId,
            isPaid: true,
          },
        });

        const subject = `Gracias por inscribirte en ${tournament.name}, el torneo de ${tournament.game} organizado por FreshWar. Estamos emocionados de tenerte a bordo para este emocionante evento.`;
        await sendEmailsByTotalParticipants(
          countParticipants,
          subject,
          'register',
        );
      } else {
        const countParticipants = await TournamentParticipant.count({
          where: {
            tournamentId: tournamentId,
            isPaid: true,
          },
        });

        if (countParticipants < tournament.maxParticipants) {
          await TournamentParticipant.update(
            { isPaid: true },
            {
              returning: false,
              where: {
                tournamentId: tournamentId,
                participantId: participant.id,
              },
            },
          );
        }

        const subject = 'Confirmación de Inscripción 🎉';
        await sendEmailsByTotalParticipants(
          countParticipants,
          subject,
          'confirmationPay',
        );
      }
    }

    return tournamentParticipant;
  }

  async updateParticipantTournament(
    oldTournamentId: number,
    newTournamentId: number,
    participantId: number,
  ): Promise<boolean> {
    const oldTournament = await Tournament.findByPk(oldTournamentId);

    if (!oldTournament) {
      throw new NotFoundException('Torneo anterior no encontrado');
    }
    const newTournament = await Tournament.findByPk(newTournamentId);
    if (!newTournament) {
      throw new NotFoundException('Nuevo torneo no encontrado');
    }

    const participant = await Participant.findByPk(participantId);
    if (!participant) {
      throw new NotFoundException('Participante no encontrado');
    }

    await oldTournament.$remove('Participants', participant);
    await newTournament.$add('Participants', participant);

    return true;
  }

  async removeParticipantFromTournament(
    tournamentId: number,
    participantId: number,
  ): Promise<boolean> {
    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    const participant = await Participant.findByPk(participantId);
    if (!participant) {
      throw new NotFoundException('Participante no encontrado');
    }

    const result = await tournament.$remove('Participants', participant);
    return !!result;
  }

  async markParticipantAsPaid(
    tournamentId: number,
    participantId: number,
  ): Promise<boolean> {
    const tournamentParticipant = await TournamentParticipant.findOne({
      where: {
        tournamentId: tournamentId,
        participantId: participantId,
      },
    });

    const { fullName, email } = await Participant.findByPk(participantId);
    const { name, game, dateTime, rules } =
      await Tournament.findByPk(tournamentId);
    const { userName } = await TournamentParticipant.findOne({
      where: {
        tournamentId: tournamentId,
        participantId: participantId,
      },
    });

    const datesAndTimes = getDatesAndTimesByTimeZone(dateTime);

    if (!tournamentParticipant) {
      throw new NotFoundException('Relación Torneo-Participante no encontrada');
    }

    tournamentParticipant.isPaid = true;
    await tournamentParticipant.save();

    const context = {
      fullName,
      userName,
      name,
      game,
      datesAndTimes,
      rules,
    };

    await this.emailsService.sendMailService(
      email,
      'Confirmación de Inscripción 🎉',
      'confirmationPay',
      context,
    );

    return true;
  }

  async getTournamentsByParticipantEmail(
    emailParticipant: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ registers: TournamentParticipant[]; total: number }> {
    const { count, rows: registers } =
      await TournamentParticipant.findAndCountAll({
        include: [
          {
            model: Participant,
            attributes: [],
            where: { email: emailParticipant },
          },
          {
            model: Tournament,
          },
        ],
        offset: (page - 1) * pageSize,
        limit: pageSize,
      });

    return { registers, total: count };
  }

  async checkParticipantIsRegisteredInTournament(
    tournamentId: number,
    participantId: number,
  ): Promise<boolean> {
    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    const participant = await Participant.findByPk(participantId);
    if (!participant) {
      throw new NotFoundException('Participante no encontrado');
    }

    const result = await tournament.$get('participants', {
      where: {
        id: participantId,
      },
    });
    return !!result.length;
  }
}
