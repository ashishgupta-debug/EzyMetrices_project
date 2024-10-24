# EzyMetrics Backend API

## Overview

EzyMetrics is a backend service that provides data integration and reporting capabilities. This API allows you to interact with dummy CRM and marketing platforms, store data, generate reports, and send alerts via email.

## Features

- **ETL Process**: Integrate and store data from dummy CRM and marketing platforms.
- **Report Generation**: Generate reports in PDF and CSV formats.
- **Email Alerts**: Send email notifications based on specific conditions.

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (version 4.x or higher)
- Email service credentials (e.g., Gmail account)

## Getting Started

### 1. Clone the Repository

git clone https://github.com/yourusername/ezymetrics-backend.git
cd ezymetrics-backend

### 2. Install Dependencies

npm install

### 3. Set up Environment Variables

- **MONGODB_URL**=mongodb://localhost:27017/ezymetrics
- **MAIL_USER**=your_email@gmail.com
- **MAIL_PASS**=your_email_password

### 4. start the server

node index.js

## API will be available at http://localhost:4000

## API Endpoints

**Method**: POST
**Endpoint**: /api/etl
**Description**: Fetch lead and campaign data, and store it in the database.

**Request Body**:- none

## Generate Reports

**Method**: GET
**Endpoint**: /api/reports/generate
**Description**: Generate reports in PDF or CSV format.

## Query Parameters:

**type**: The format of the report. Acceptable values are pdf or csv. Default is pdf.

## Send Email Alerts

**Method**: POST
**Endpoint**: /api/alert
**Description**: Send email notifications based on certain conditions.
