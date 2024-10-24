const express = require('express');
const { runETL, generateReport, sendAlert } = require('../controllers/etlController');
const router = express.Router();

// ETL route
router.post('/etl', runETL);

// Report generation route
router.get('/reports/generate', generateReport);

// Alert route
router.post('/alert', sendAlert);

module.exports = router;
