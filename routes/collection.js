const { Router } = require("express");
const router = Router();

const CollectionControls = require("../controllers/CollectionController");

router.post("/create", CollectionControls.create);
router.post("/:idcoll", CollectionControls.get);

module.exports = router;
