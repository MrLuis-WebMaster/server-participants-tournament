import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Participant } from 'src/modules/participants/participants.entity';
import { Tournament } from 'src/modules/tournaments/tournaments.entity';
import { TournamentParticipant } from 'src/modules/tournament-participant/tournament-participant.entity';

let config;
switch (process.env.NODE_ENV) {
  case DEVELOPMENT:
    config = databaseConfig.development;
    break;
  case PRODUCTION:
    config = databaseConfig.production;
    break;
  default:
    config = databaseConfig.development;
}

if (process.env.NODE_ENV === 'production') {
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

export const sequelize = new Sequelize(config);

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      sequelize.addModels([Participant, Tournament, TournamentParticipant]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
