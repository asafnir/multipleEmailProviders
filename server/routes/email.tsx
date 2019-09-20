import { validationResult, Result } from 'express-validator';
import { htmlToText } from '../utils';
import EmailService from '../services/email';

export const sendEmail = async (req: any, res: any) => {
  const {  email } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const textBody = htmlToText(email.body);

  email.textBody = textBody;
  
  const emailService  = new EmailService()

  const result = await emailService.sendEmail(email)
  if (result.success) return res.status(200).json({ msg: `email sent using ${result.provider}` });
};