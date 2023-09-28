import { Controller, Post, Body } from '@nestjs/common';
import { EmailsService } from './emails.service';
import {
  ParticipantEmailtDto,
  ParticipantEmailInvitationtDto,
} from './dto/email.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailService: EmailsService) {}
  @Post('register')
  async sendEmailRegister(
    @Body() { fullName, email, userName }: ParticipantEmailtDto,
  ) {
    const to = email;
    const subject =
      'Gracias por inscribirte en FreshWar, el torneo de Call of Duty Mobile organizado por FreshWar. Estamos emocionados de tenerte a bordo para este emocionante evento.';
    const template = 'register';
    const context = {
      fullName,
      userName,
    };

    try {
      await this.emailService.sendMailService(to, subject, template, context);
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('confirmation')
  async sendEmailConfirmation(
    @Body() { fullName, email, userName }: ParticipantEmailtDto,
  ) {
    const to = email;
    const subject = 'Confirmación de Inscripción 🎉';
    const template = 'confirmationPay';
    const context = {
      fullName,
      userName,
    };

    try {
      await this.emailService.sendMailService(to, subject, template, context);
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('full')
  async sendEmailFull(
    @Body() { fullName, email, userName }: ParticipantEmailtDto,
  ) {
    const to = email;
    const subject = 'Lo sentimos :(';
    const template = 'fullTournament';
    const context = {
      fullName,
      userName,
    };

    try {
      await this.emailService.sendMailService(to, subject, template, context);
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('reminder')
  async sendEmailReminder() {
    const subject = '¡Recordatorio del Torneo! 🕹️';
    const template = 'reminder';
    try {
      await this.emailService.sendBulkMailForParticipantPaidService(
        subject,
        template,
      );
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('thanks')
  async sendEmailThanks() {
    const subject = 'Agradecimiento por tu Participación 🙌';
    const template = 'thanks';
    try {
      await this.emailService.sendBulkMailForParticipantPaidService(
        subject,
        template,
      );
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('feedback')
  async sendEmailFeedback() {
    const subject = '¡Tu Opinión Importa! Completa nuestra Encuesta 📝';
    const template = 'satisfaction';
    try {
      await this.emailService.sendBulkMailForParticipantPaidService(
        subject,
        template,
      );
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('invitation')
  async sendEmailInvitation(
    @Body()
    { idGame, passwordGame, urlInvitation }: ParticipantEmailInvitationtDto,
  ) {
    const subject =
      '¡Prepárate para la Batalla! Invitación al Torneo de Call of Duty Mobile 🎮';
    const template = 'invitation';
    const context = {
      idGame,
      passwordGame,
      urlInvitation,
    };
    try {
      await this.emailService.sendBulkMailForParticipantPaidService(
        subject,
        template,
        context,
      );
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
}
