import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'nodemailer-express-handlebars';
import emailConfig from './emails.config';
import { ParticipantsService } from '../participants/participants.service';

@Injectable()
export class EmailsService {
  private readonly transporter;

  constructor(
    @Inject(forwardRef(() => ParticipantsService))
    private participantsService: ParticipantsService,
  ) {
    this.transporter = nodemailer.createTransport({
      ...emailConfig,
    });
    this.setupTemplates();
  }

  private setupTemplates() {
    const options = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: './src/modules/emails/templates/',
        layoutsDir: './src/modules/emails/templates/',
        defaultLayout: '',
      },
      viewPath: './src/modules/emails/templates/',
      extName: '.hbs',
    };

    this.transporter.use('compile', handlebars(options));
  }

  async sendMailService(
    to: string,
    subject: string,
    template: string,
    context: any,
  ) {
    const mailOptions = {
      to,
      subject,
      template,
      context,
    };
    return await this.transporter.sendMail(mailOptions);
  }

  async sendBulkMailForParticipantPaidService(
    subject: string,
    template: string,
    context: any = {},
  ) {
    try {
      const recipients = await this.participantsService.findAllIsPaid();
      const mailOptions = recipients.map((recipient) => ({
        to: recipient.email,
        subject,
        template,
        context: {
          ...context,
          fullName: recipient.fullName,
          userName: recipient.userName,
        },
      }));

      const sendMailPromises = mailOptions.map((options) =>
        this.transporter.sendMail(options),
      );

      const results = await Promise.all(sendMailPromises);
      return results;
    } catch (error) {
      console.error('Error sending bulk emails:', error);
      throw new Error('Failed to send bulk emails');
    }
  }
}
