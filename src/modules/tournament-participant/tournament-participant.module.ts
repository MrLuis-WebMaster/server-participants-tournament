import { Module, forwardRef } from '@nestjs/common';
import { TournamentParticipant } from './tournament-participant';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [forwardRef(() => EmailsModule)],
  providers: [TournamentParticipant],
})
export class TournamentParticipantModule {}
