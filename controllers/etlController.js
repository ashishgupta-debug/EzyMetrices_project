const axios = require('axios');
const Lead = require('../models/lead');
const Campaign = require('../models/campaign');
const pdfkit = require('pdfkit');
const { Parser } = require('json2csv');
const nodemailer = require('nodemailer');

// ETL Process (Extract, Transform, Load)
const runETL = async (req, res) => {
  try {
    const leadsData = await axios.get('http://localhost:3000/crm/leads');
    const campaignsData = await axios.get('http://localhost:3000/marketing/campaigns');

    // Store data in MongoDB
    await Lead.insertMany(leadsData.data);
    await Campaign.insertMany(campaignsData.data);

    res.send('Data integrated and stored successfully!');
  } catch (error) {
    res.status(500).send('ETL process failed: ' + error.message);
  }
};

// Report Generation (PDF/CSV)
const generateReport = async (req, res) => {
  try {
    const leads = await Lead.find({});
    const campaigns = await Campaign.find({});
    const reportType = req.query.type || 'pdf';

    if (reportType === 'pdf') {
      const doc = new pdfkit();
      res.setHeader('Content-Type', 'application/pdf');
      doc.pipe(res);
      doc.text('Lead Data:', { underline: true });
      leads.forEach(lead => doc.text(`Name: ${lead.name}, Email: ${lead.email}, Status: ${lead.status}`));
      doc.text('Campaign Data:', { underline: true });
      campaigns.forEach(campaign => doc.text(`Name: ${campaign.name}, Budget: ${campaign.budget}, Leads: ${campaign.leadsGenerated}`));
      doc.end();
    } else if (reportType === 'csv') {
      const fields = ['name', 'email', 'status'];
      const csvParser = new Parser({ fields });
      const csv = csvParser.parse(leads);
      res.setHeader('Content-Type', 'text/csv');
      res.attachment('report.csv');
      res.send(csv);
    }
  } catch (error) {
    res.status(500).send('Failed to generate report: ' + error.message);
  }
};

// Email Alert
const sendAlert = async (req, res) => {
  try {
    const { email, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'This is an Alert message',
      text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Alert sent: ' + info.response);
    });
  } catch (error) {
    res.status(500).send('Failed to send alert: ' + error.message);
  }
};

module.exports = { runETL, generateReport, sendAlert };
