import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ParticipantsModule,
    EmailsModule,
    TournamentsModule,
    TournamentParticipantModule,
  ],
  controllers: [AppController, TournamentParticipantController],
  providers: [AppService, TournamentsService, TournamentParticipantsService],
})
export class AppModule {}
