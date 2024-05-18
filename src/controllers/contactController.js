import sendEmail from '../services/smtp/sendEmail.js';

export const contactController = async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    await sendEmail({ email, subject, message });
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
