import { Controller, Post, Body, Param } from '@nestjs/common';
import { EmailsService } from './emails.service';
import {
  ParticipantEmailtDto,
  ParticipantEmailInvitationtDto,
  ParticipantInfoBasicDto,
} from './dto/email.dto';
import { getDatesAndTimesByTimeZone } from 'src/utils/date';

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
    @Body()
    {
      fullName,
      email,
      userName,
      game,
      dateTime,
      name,
      rules,
    }: ParticipantEmailtDto,
  ) {
    const to = email;
    const subject = 'Confirmación de Inscripción 🎉';
    const template = 'confirmationPay';
    const datesAndTimes = getDatesAndTimesByTimeZone(dateTime);

    const context = {
      fullName,
      userName,
      game,
      datesAndTimes,
      name,
      rules,
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
  @Post('reminder/:tournamentId')
  async sendEmailReminder(
    @Body()
    { game, dateTime, name, rules }: ParticipantEmailtDto,
    @Param('tournamentId') tournamentId: number,
  ) {
    const subject = '¡Recordatorio del Torneo! 🕹️';
    const template = 'reminder';
    try {
      getDatesAndTimesByTimeZone;
      await this.emailService.sendBulkMailForParticipantPaidService(
        tournamentId,
        subject,
        template,
        {
          rules: rules,
          datesAndTimes: getDatesAndTimesByTimeZone(dateTime),
          name: name,
          game: game,
        },
      );
      return 'Email sent successfully';
    } catch (error) {
      console.log(error);
      throw new Error('Error sending email');
    }
  }
  @Post('thanks/:tournamentId')
  async sendEmailThanks(
    @Body()
    { game, name }: ParticipantEmailtDto,
    @Param('tournamentId') tournamentId: number,
  ) {
    const subject = 'Agradecimiento por tu Participación 🙌';
    const template = 'thanks';
    try {
      await this.emailService.sendBulkMailForParticipantPaidService(
        tournamentId,
        subject,
        template,
        {
          game,
          name,
        },
      );
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('feedback/:tournamentId')
  async sendEmailFeedback(@Param('tournamentId') tournamentId: number) {
    const subject = '¡Tu Opinión Importa! Completa nuestra Encuesta 📝';
    const template = 'satisfaction';
    try {
      await this.emailService.sendBulkMailForParticipantPaidService(
        tournamentId,
        subject,
        template,
      );
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('invitation/:tournamentId')
  async sendEmailInvitation(
    @Body()
    {
      idGame,
      passwordGame,
      urlInvitation,
      name,
      game,
    }: ParticipantEmailInvitationtDto,
    @Param('tournamentId') tournamentId: number,
  ) {
    const subject =
      '¡Prepárate para la Batalla! Invitación al Torneo de Call of Duty Mobile 🎮';
    const template = 'invitation';
    const context = {
      idGame,
      passwordGame,
      urlInvitation,
      name,
      game,
    };
    try {
      await this.emailService.sendBulkMailForParticipantPaidService(
        tournamentId,
        subject,
        template,
        context,
      );
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
  @Post('notification-admin')
  async sendEmailToAdmin(
    @Body()
    { fullName, email, phone }: ParticipantInfoBasicDto,
  ) {
    //TODO: insert emails admin's

    const to = 'mr.luiswebmaster@gmail.com';
    const subject = 'Hola Admin, un usuario quiero organizar un torneo';
    const template = 'notificationAdmin';

    const context = {
      fullName,
      email,
      phone,
    };

    try {
      await this.emailService.sendMailService(to, subject, template, context);
      return 'Email sent successfully';
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
}
