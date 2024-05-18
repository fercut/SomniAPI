import nodemailer from 'nodemailer';

const emailQueue = {}; // Objeto para almacenar la última marca de tiempo de envío por dirección de correo electrónico

const sendEmail = async ({ email, subject, message }) => {
  const currentTime = Date.now();
  const emailKey = email.toLowerCase(); // Normaliza la dirección de correo electrónico para evitar duplicados
  
  // Verifica si la dirección de correo electrónico ha enviado un correo electrónico recientemente
  if (emailQueue[emailKey] && currentTime - emailQueue[emailKey] < 1800000) { // 1800000 milisegundos = 30 minutos
    throw new Error('Debes esperar 30 minutos antes de enviar otro correo electrónico.');
  }

  // Si no hay restricciones, envía el correo electrónico
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: email,
    to: 'somnijoyas@gmail.com',
    subject: email + ' / ' + subject,
    text: message
  };

  await transporter.sendMail(mailOptions);

  // Registra la marca de tiempo del envío del correo electrónico
  emailQueue[emailKey] = currentTime;
};

export default sendEmail;
