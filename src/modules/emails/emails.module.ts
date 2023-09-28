import { Module, forwardRef } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { ParticipantsModule } from '../participants/participants.module';

@Module({
  imports: [forwardRef(() => ParticipantsModule)],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
