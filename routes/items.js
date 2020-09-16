const { Router } = require("express");
const router = Router();

const ItemControls = require("../controllers/ItemController");

router.post("/create", ItemControls.create);
router.delete("/delete/:iditem", ItemControls.delete);
router.patch("/edit/:iditem", ItemControls.edit);

module.exports = router;
