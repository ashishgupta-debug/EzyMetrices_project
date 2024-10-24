const express = require ("express");
const bodyParser = require("body-parser");
const etlRoutes = require("./routes/etl");

const app = express();
app.use(bodyParser.json());

const database = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3000;

// Database connection
database.connect();

// use routes
app.use('/api', etlRoutes);


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
