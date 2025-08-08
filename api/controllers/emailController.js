const axios = require('axios');
const nodemailer = require('nodemailer');

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateEmail = async (req, res) => {
  const { prompt } = req.body;
  console.log('reache api to generate')
  console.log(req.body.prompt)

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedText = response.data.choices[0].message.content;
    res.json({ emailText: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating email' });
  }
};

const generateSubject = async (req, res) => {
    console.log('reached sub gen')
    const { prompt } = req.body;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Generate a concise and professional email subject line.' },
            { role: 'user', content: prompt }
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const subject = response.data.choices[0].message.content.trim();
      res.json({ subject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating subject' });
    }
  };

const sendEmail = async (req, res) => {
    console.log('reached send mail api')
  const { recipients, subject, body } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients,
      subject: subject || 'No Subject',
      html: body,
    });

    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
};

module.exports = { generateEmail, sendEmail, generateSubject };
