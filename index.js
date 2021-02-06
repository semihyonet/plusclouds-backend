const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const requireAuth = require("./middlewares/requireAuth");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const User = require("./models/User");
const UserDetails = require("./models/UserDetails");

const sequelize = require("./db/mysql");
const app = express();

const cors = require("cors");

var http = require("http");

var httpServer = http.createServer(app);

app.use(cors());

app.use(bodyParser.json());

app.use(authRoutes);
app.use(requireAuth);
app.use(userRoutes);

app.use(User);
app.use(UserDetails);

User.hasOne(UserDetails);

UserDetails.belongsTo(User);

httpServer.listen(process.env.PORT, () => {
	sequelize
		.sync()
		.then(() => {
			console.log(`Hello Server is running at ${process.env.PORT}`);
		})
		.catch((e) => {
			throw e;
		});
});
