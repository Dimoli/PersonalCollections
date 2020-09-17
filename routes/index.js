const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/full-text-search", require("./fullTextSearch"));
router.use("/collections", require("./collections"));
router.use("/items", require("./items"));
router.use("/admin-operations", require("./admin/operations"));

module.exports = router;
