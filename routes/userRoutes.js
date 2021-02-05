const express = require("express");
const router = express.Router();

router.get("/user", async (req, res) => {
	req.user
		.getUserdetail()
		.then((detail) => {
			res.send({
				...detail.dataValues,
				username: req.user.dataValues.username,
			});
		})
		.catch((e) => {
			throw e;
		});
});

router.put("/user/gsm", async (req, res) => {
	req.user
		.getUserdetail()
		.then(async (detail) => {
			detail.gsmNumber = req.body.gsmNumber;
			await detail.save();
			res.send({
				...detail.dataValues,
				username: req.user.dataValues.username,
			});
		})
		.catch((e) => {
			throw e;
		});
});
router.put("/user/id", async (req, res) => {
	req.user
		.getUserdetail()
		.then(async (detail) => {
			detail.tcNo = req.body.tcNo;
			await detail.save();
			res.send({
				...detail.dataValues,
				username: req.user.dataValues.username,
			});
		})
		.catch((e) => {
			throw e;
		});
});
router.put("/user/mail", async (req, res) => {
	req.user
		.getUserdetail()
		.then(async (detail) => {
			detail.mail = req.body.mail;
			await detail.save();
			res.send({
				...detail.dataValues,
				username: req.user.dataValues.username,
			});
		})
		.catch((e) => {
			throw e;
		});
});
module.exports = router;
