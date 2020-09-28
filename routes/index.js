const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/oauth", require("./Oauth"));
router.use("/user-main", require("./userMain"));
router.use("/full-text-search", require("./fullTextSearch"));
router.use("/collections", require("./collections"));
router.use("/items", require("./items"));
router.use("/admin", require("./adminMain"));

module.exports = router;
