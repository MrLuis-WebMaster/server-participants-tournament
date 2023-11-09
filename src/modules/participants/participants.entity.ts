import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Tournament } from '../tournaments/tournaments.entity';
import { TournamentParticipant } from '../tournament-participant/tournament-participant.entity';

@Table
export class Participant extends Model<Participant> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  platform: string;

  @BelongsToMany(() => Tournament, () => TournamentParticipant)
  tournaments: Tournament[];
}
