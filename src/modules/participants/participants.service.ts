import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Participant } from './participants.entity';
import { ParticipantDto } from './dto/participant.dto';
import { EmailsService } from '../emails/emails.service';
import { Op } from 'sequelize';

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject(forwardRef(() => EmailsService))
    private emailsService: EmailsService,
  ) {}
  async countPaidParticipants(): Promise<number> {
    const count = await Participant.count({ where: { isPaid: true } });
    return count;
  }
  async create(participantDto: ParticipantDto): Promise<Participant> {
    const participant = await Participant.create(participantDto);
    const countParticipants = await this.countPaidParticipants();
    const { email, fullName, userName } = participantDto;
    if (countParticipants < 100) {
      const to = email;
      const subject =
        'Gracias por inscribirte en FreshWar, el torneo de Call of Duty Mobile organizado por FreshWar. Estamos emocionados de tenerte a bordo para este emocionante evento.';
      const template = 'register';
      const context = {
        fullName,
        userName,
      };
      this.emailsService.sendMailService(to, subject, template, context);
    } else {
      const to = email;
      const subject = 'Lo sentimos :(';
      const template = 'fullTournament';
      const context = {
        fullName,
        userName,
      };
      this.emailsService.sendMailService(to, subject, template, context);
    }

    return participant;
  }
  async findAll(
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
  ): Promise<{ participants: Participant[]; totalCount: number }> {
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
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['fullName', 'ASC']],
    });

    const totalCount = await Participant.count({ where: whereClause });

    return { participants, totalCount };
  }
  async findAllIsPaid(): Promise<Participant[]> {
    try {
      const whereClause = {
        isPaid: true,
      };

      const participants: Participant[] = await Participant.findAll({
        where: whereClause,
        attributes: ['email', 'fullName', 'userName'],
        order: [['fullName', 'ASC']],
      });

      return participants;
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
  async updateIsPaid(id: number): Promise<boolean> {
    try {
      const { email, fullName, userName } = await Participant.findByPk(id);

      const [updatedRows] = await Participant.update(
        { isPaid: true },
        { where: { id } },
      );

      const to = email;
      const subject = 'Confirmación de Inscripción 🎉';
      const template = 'confirmationPay';
      const context = {
        fullName,
        userName,
      };

      await this.emailsService.sendMailService(to, subject, template, context);

      return updatedRows > 0;
    } catch (error) {
      console.error('Error updating isPaid:', error);
      throw new Error('Failed to update isPaid');
    }
  }
  async remove(id: number): Promise<void> {
    const participant = await Participant.findByPk(id);
    await participant.destroy();
  }
}
