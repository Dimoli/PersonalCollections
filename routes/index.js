const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/collections", require("./collections"));
router.use("/item", require("./item"));
router.use("/admin-operations", require("./admin/operations"));
// router.use("/full-text-search", require("./fullTextSearch"));

module.exports = router;
