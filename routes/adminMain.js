const { Router } = require("express");
const router = Router();
const AdminMainController = require("../controllers/AdminMainController");

router.patch("/:operation", AdminMainController.operation);

module.exports = router;
