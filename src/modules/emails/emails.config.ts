import * as dotenv from 'dotenv';

dotenv.config();

export default {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_ADMIN_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
