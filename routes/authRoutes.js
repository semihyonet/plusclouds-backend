const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/signin", async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.send("Fields required are not present");
	} else
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				throw err;
			}
			if (!req.body.password) {
				res.status(401).send("No password");
			}
			bcrypt.hash(req.body.password, salt, async (err, hash) => {
				if (err) {
					throw err;
				}
				try {
					const [user, created] = await User.findOrCreate({
						where: { username: req.body.username },
						defaults: {
							password: hash,
						},
					});
					console.log(user);
					console.log(created);
					if (created && user && user._options.isNewRecord) {
						const details = await user.createUserdetail({
							mail: null,
							gsmNumber: null,
							tcNo: null,
						});

						const token = jwt.sign(
							{ username: req.body.username },
							process.env.SECRET_KEY
						);

						res.send({
							created: true,
							message: "Congrats",
							token,
							data: {
								...details.dataValues,
								username: user.username,
							},
						});
					} else if (!created && user && !user._options.isNewRecord) {
						res.send({
							created: false,
							message: "User already exists!",
						});
					} else {
						res.send({ created, message: "ERROR", error: true });
					}
				} catch (e) {
					throw e;
				}
			});
		});
});

router.post("/login", async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.send("Fields required are not present");
	} else
		try {
			const user = await User.findOne({
				where: { username: req.body.username },
			});
			if (user) {
				bcrypt.compare(
					req.body.password,
					user.password,
					async (err, isMatch) => {
						if (err) {
							console.log(
								"Error sadly : " +
									JSON.stringify(err, undefined, 2)
							);
						}

						if (!isMatch) {
							res.send("Incorrect username or password 1");
						} else {
							const token = jwt.sign(
								{ username: user.username },
								process.env.SECRET_KEY
							);
							const detail = await user.getUserdetail();
							res.send({
								token,
								login: true,
								data: {
									username: user.username,
									...detail.dataValues,
								},
							});
						}
					}
				);
			}
			if (!user) {
				res.send("No matching user!");
			}
		} catch (error) {
			throw error;
		}
});

module.exports = router;
