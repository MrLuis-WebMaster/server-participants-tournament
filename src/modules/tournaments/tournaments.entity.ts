import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Participant } from '../participants/participants.entity';
import { TournamentParticipant } from '../tournament-participant/tournament-participant.entity';

@Table
export class Tournament extends Model<Tournament> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  game: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  format: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateTime: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  entryFee: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  prizes: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  rules: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bannerLink: string;

  @Column({
    type: DataType.ENUM('Open', 'Closed', 'Finished'),
    allowNull: false,
  })
  status: 'Open' | 'Closed' | 'Finished';

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxParticipants: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  livestreamLink: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  emailOrganizer: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneOrganizer: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nameOrganizer: string;

  @BelongsToMany(() => Participant, () => TournamentParticipant)
  participants: Participant[];
}
