const { Router } = require("express");
const router = Router();

const CollectionControls = require("../controllers/CollectionController");

router.post("/create", CollectionControls.create);
router.post("/get", CollectionControls.getCollections);
router.post("/:idcoll", CollectionControls.getCollection);

module.exports = router;
