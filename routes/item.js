const { Router } = require("express");
const router = Router();

const ItemControls = require("../controllers/ItemController");

router.post("/create", ItemControls.create);

module.exports = router;
