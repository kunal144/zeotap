// routes/ingestionRoutes.js
const express = require("express");
const router = express.Router();
const ingestionController = require("../controllers/ingestionController");

// Route: Export data from ClickHouse to a flat file (CSV)
router.post(
  "/clickhouse-to-flatfile",
  ingestionController.clickhouseToFlatFile
);

// Route: Import data from a flat file (CSV) into ClickHouse
router.post(
  "/flatfile-to-clickhouse",
  ingestionController.flatFileToClickhouse
);

// Route: Retrieve available ClickHouse tables/columns (Schema Discovery)
router.post("/clickhouse-schema", ingestionController.getClickhouseSchema);

router.get("/clickhouse-columns", ingestionController.getClickhouseColumns);

router.post(
  "/clickhouse-connection",
  ingestionController.getClickhouseConnection
);

// Route: Retrieve CSV headers for flat file schema discovery
router.post("/flatfile-schema", ingestionController.getFlatFileSchema);

module.exports = router;
