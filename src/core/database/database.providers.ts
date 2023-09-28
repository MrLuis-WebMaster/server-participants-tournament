import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Participant } from 'src/modules/participants/participants.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
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
      const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
          host: config.host,
          port: config.port,
          dialect: config.dialect,
        },
      );
      sequelize.addModels([Participant]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
