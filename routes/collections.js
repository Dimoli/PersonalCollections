const { Router } = require("express");
const router = Router();

const CollectionControls = require("../controllers/CollectionController");

router.post("/create", CollectionControls.create);
router.post("/get", CollectionControls.getCollections);
router.post("/get/:idcoll", CollectionControls.getCollection);
router.patch("/update/:idcoll", CollectionControls.updateCollectionDescription);
router.delete("/delete/:idcoll", CollectionControls.deleteCollection);

module.exports = router;
