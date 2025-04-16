// controllers/ingestionController.js
const clickhouseService = require("../services/clickHouseService");
const flatFileService = require("../services/flatFileService");
const path = require("path");
const fs = require("fs");

exports.clickhouseToFlatFile = async (req, res) => {
  try {
    const { config, table, columns } = req.body;

    const stream = clickhouseService.fetchData(config, table, columns);
    const batchSize = 1000;

    const filePath = path.resolve(
      "/Users/kunal/Downloads/web/zeotap/backend/output.csv"
    );

    let batch = [];
    let existingData = [];
    let finalData = [];

    const fileExists = fs.existsSync(filePath);

    // If file exists, load existing data
    if (fileExists) {
      const existingColumns = await flatFileService.getHeaders(filePath);
      existingData = await flatFileService.readCSV(filePath, existingColumns);
    }

    for await (const row of stream) {
      batch.push(row);
      if (batch.length >= batchSize) {
        finalData = mergeRecords(existingData, batch);
        await flatFileService.writeCSV(
          Object.keys(finalData[0]),
          finalData,
          filePath
        );
        existingData = finalData;
        batch = [];
      }
    }

    // Write any remaining batch
    if (batch.length > 0) {
      finalData = mergeRecords(existingData, batch);
      await flatFileService.writeCSV(
        Object.keys(finalData[0]),
        finalData,
        filePath
      );
    }

    res.json({ message: "Data joined and exported successfully", filePath });
  } catch (err) {
    console.error("Join Export Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Merge two arrays of objects by index
function mergeRecords(existing, incoming) {
  const maxLength = Math.max(existing.length, incoming.length);
  const merged = [];

  for (let i = 0; i < maxLength; i++) {
    merged.push({
      ...(existing[i] || {}),
      ...(incoming[i] || {}),
    });
  }

  return merged;
}

exports.flatFileToClickhouse = async (req, res) => {
  try {
    // Expected request body: { config, filePath, columns, targetTable }
    const { config, filePath, columns, targetTable } = req.body;
    const records = await flatFileService.readCSV(filePath, columns);
    const count = await clickhouseService.insertData(
      config,
      targetTable,
      records
    );
    res.json({ message: "Data ingested successfully", recordsInserted: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClickhouseSchema = async (req, res) => {
  try {
    // Expected request body: { config }
    const { config } = req.body;
    const tables = await clickhouseService.getTables(config);
    res.json({ tables });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClickhouseConnection = async (req, res) => {
  try {
    // Expected request body: { config }
    const { config } = req.body;
    const client = clickhouseService.createClient(config);
    if (client) {
      return res.json({ msg: "connection successful", client });
    }
    return res.json({ msg: "connection unsuccessful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClickhouseColumns = async (req, res) => {
  try {
    // Expected request body: { config }
    const { config } = req.body;
    const tables = await clickhouseService.getColumns(config);
    res.json({ tables });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlatFileSchema = async (req, res) => {
  try {
    // Expected request body: { filePath }
    const { filePath } = req.body;
    const headers = await flatFileService.getHeaders(filePath);
    res.json({ headers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
