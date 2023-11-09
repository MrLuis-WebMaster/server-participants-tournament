import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Participant } from './participants.entity';
import { Tournament } from '../tournaments/tournaments.entity';
import { ParticipantDto } from './dto/participant.dto';
import { EmailsService } from '../emails/emails.service';
import { Op } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { sequelize } from 'src/core/database/database.providers';
import { TournamentParticipant } from '../tournament-participant/tournament-participant.entity';
interface CombinedData {
  tournamentId: number;
  participantId: number;
  userName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isPaid: boolean;
  id: number;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  platform: string;
}

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject(forwardRef(() => EmailsService))
    private emailsService: EmailsService,
  ) {}

  async findAll(
    tournamentId: number,
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
  ): Promise<{
    participants: Participant[];
    totalCount: number;
    totalCountPaid: number;
  }> {
    let whereClause = {};

    if (searchTerm) {
      whereClause = {
        [Op.or]: [
          { email: { [Op.like]: `%${searchTerm}%` } },
          { fullName: { [Op.like]: `%${searchTerm}%` } },
          { phone: { [Op.like]: `%${searchTerm}%` } },
        ],
      };
    }

    const participants: Participant[] = await Participant.findAll({
      where: whereClause,
      include: [
        {
          model: Tournament,
          where: { id: tournamentId },
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['fullName', 'ASC']],
    });

    const totalCount = await Participant.count({
      where: whereClause,
      include: [
        {
          model: Tournament,
          where: { id: tournamentId },
        },
      ],
    });

    const totalCountPaid = await TournamentParticipant.count({
      where: {
        tournamentId: tournamentId,
        isPaid: true,
      },
    });

    return { participants, totalCount, totalCountPaid };
  }

  async findAllIsPaid(tournamentId: number): Promise<CombinedData[]> {
    try {
      const sqlQuery = `
          SELECT "tp".*, "p".*
          FROM "TournamentParticipants" AS "tp"
          INNER JOIN "Participants" AS "p" ON "tp"."participantId" = "p"."id"
          WHERE "tp"."tournamentId" = ${tournamentId} AND "tp"."isPaid" = true
        `;

      const participants: any[] = await sequelize.query(sqlQuery, {
        type: QueryTypes.SELECT,
      });

      const typedParticipants: CombinedData[] = participants.map(
        (participant) => {
          return {
            tournamentId: participant.tournamentId,
            participantId: participant.participantId,
            userName: participant.userName,
            userId: participant.userId,
            createdAt: participant.createdAt,
            updatedAt: participant.updatedAt,
            isPaid: participant.isPaid,
            id: participant.id,
            fullName: participant.fullName,
            email: participant.email,
            phone: participant.phone,
            age: participant.age,
            platform: participant.platform,
          };
        },
      );

      return typedParticipants;
    } catch (error) {
      console.error('Error al obtener participantes:', error);
      throw new Error('Failed to fetch participants');
    }
  }
  async findOne(id: number): Promise<Participant> {
    return await Participant.findByPk(id);
  }
  async update(id: number, participantDto: ParticipantDto): Promise<boolean> {
    await Participant.update(participantDto, { where: { id } });
    return true;
  }
  async remove(id: number): Promise<void> {
    const participant = await Participant.findByPk(id);
    await participant.destroy();
  }
}
