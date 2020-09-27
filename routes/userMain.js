const { Router } = require("express");
const router = Router();
const UserMainController = require("../controllers/UserMainController");

router.post("/", UserMainController.get);

module.exports = router;
