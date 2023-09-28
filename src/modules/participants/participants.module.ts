import { Module, forwardRef } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { participantsProviders } from './participants.providers';
import { ParticipantsController } from './participants.controller';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [forwardRef(() => EmailsModule)],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ...participantsProviders],
  exports: [ParticipantsService, ...participantsProviders],
})
export class ParticipantsModule {}
