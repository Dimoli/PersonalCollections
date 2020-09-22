const { Router } = require("express");
const router = Router();

const ItemControls = require("../controllers/ItemController");

router.post("/create", ItemControls.create);
router.post("/get/:iditem", ItemControls.get);
router.delete("/delete/:iditem", ItemControls.delete);
router.patch("/edit/fields/:iditem", ItemControls.edit.fields);
router.patch("/edit/usersByLikes/:iditem", ItemControls.edit.usersByLikes);

module.exports = router;
