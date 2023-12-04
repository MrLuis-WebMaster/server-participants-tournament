import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ParticipantsModule } from './modules/participants/participants.module';
import { EmailsModule } from './modules/emails/emails.module';
import { TournamentsService } from './modules/tournaments/tournaments.service';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { TournamentParticipantController } from './modules/tournament-participant/tournament-participant.controller';
import { TournamentParticipantsService } from './modules/tournament-participant/tournament-participant.service';
import { TournamentParticipantModule } from './modules/tournament-participant/tournament-participant.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ParticipantsModule,
    EmailsModule,
    TournamentsModule,
    TournamentParticipantModule,
    AuthModule,
  ],
  controllers: [AppController, TournamentParticipantController],
  providers: [AppService, TournamentsService, TournamentParticipantsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'tournaments', method: RequestMethod.GET },
        { path: 'tournaments/:tournamnetId', method: RequestMethod.GET },
        { path: 'participants/register', method: RequestMethod.POST },
      )
      .forRoutes(
        {
          path: 'tournaments*',
          method: RequestMethod.ALL,
        },
        {
          path: 'emails*',
          method: RequestMethod.ALL,
        },
        {
          path: 'participants*',
          method: RequestMethod.ALL,
        },
        {
          path: 'tournament-participant*',
          method: RequestMethod.ALL,
        },
      );
  }
}
