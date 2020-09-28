const { Router } = require("express");
const router = Router();
const AdminMainController = require("../controllers/AdminMainController");

router.patch("/operations/:operation", AdminMainController.operation);

module.exports = router;
