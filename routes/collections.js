const { Router } = require("express");
const router = Router();

const CollectionControls = require("../controllers/CollectionController");

router.post("/create", CollectionControls.create);
router.post("/get", CollectionControls.getCollections);
router.post("/get/:idcoll", CollectionControls.getCollection);
router.post("/delete/:idcoll", CollectionControls.deleteCollection);

module.exports = router;
