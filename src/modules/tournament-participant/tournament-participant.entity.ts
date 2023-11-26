import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Tournament } from '../tournaments/tournaments.entity';
import { Participant } from '../participants/participants.entity';

@Table
export class TournamentParticipant extends Model<TournamentParticipant> {
  @ForeignKey(() => Tournament)
  @Column
  tournamentId: number;

  @ForeignKey(() => Participant)
  @Column
  participantId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isPaid: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  platform: string;
}
