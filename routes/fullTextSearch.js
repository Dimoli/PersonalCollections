const { Router } = require("express");
const router = Router();

const FullTextSearchController = require("../controllers/FullTextSearchController");

router.post("/", FullTextSearchController.find);

module.exports = router;
