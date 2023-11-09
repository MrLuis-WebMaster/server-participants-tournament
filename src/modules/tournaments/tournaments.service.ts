import { Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Tournament } from './tournaments.entity';
import { Participant } from '../participants/participants.entity';
import { TournamentDto } from './dto/tournament.dto';
@Injectable()
export class TournamentsService {
  async create(tournamentDto: TournamentDto): Promise<Tournament> {
    return Tournament.create(tournamentDto);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
  ): Promise<{ tournaments: Tournament[]; totalCount: number }> {
    let whereClause = {};

    if (searchTerm) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { game: { [Op.like]: `%${searchTerm}%` } },
        ],
      };
    }

    const tournaments = await Tournament.findAll({
      where: whereClause,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['createdAt', 'ASC']],
    });

    const totalCount = await Tournament.count({ where: whereClause });

    return { tournaments, totalCount };
  }

  async findOne(id: number): Promise<Tournament> {
    return Tournament.findByPk(id);
  }

  async findOneAndParticipants(id: number): Promise<Tournament> {
    const tournament = await Tournament.findByPk(id, {
      include: [
        {
          model: Participant,
        },
      ],
    });

    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    return tournament;
  }

  async update(id: number, tournamentDto: TournamentDto): Promise<boolean> {
    const [updatedRows] = await Tournament.update(tournamentDto, {
      where: { id },
    });
    return updatedRows > 0;
  }

  async remove(id: number): Promise<void> {
    const tournament = await Tournament.findByPk(id);
    await tournament.destroy();
  }

  async findTournamentsByStatus(
    status: 'Open' | 'Closed' | 'Finished',
  ): Promise<Tournament[]> {
    return Tournament.findAll({ where: { status } });
  }

  async findTournamentsByGame(game: string): Promise<Tournament[]> {
    return Tournament.findAll({ where: { game } });
  }

  async searchTournamentsByTerm(searchTerm: string): Promise<Tournament[]> {
    return Tournament.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { game: { [Op.like]: `%${searchTerm}%` } },
          { rules: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    });
  }
}
