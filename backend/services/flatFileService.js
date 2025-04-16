const fs = require("fs");
const csv = require("csv-parser");
const { createObjectCsvWriter } = require("csv-writer");

/**
 * Writes data to a CSV file with optional delimiter.
 * @param {array} columns - Array of column names.
 * @param {array} data - Array of objects (records) to write.
 * @param {string} [filePath='./exports/output.csv'] - Path for the output CSV file.
 * @param {string} [delimiter=','] - Delimiter to use in the CSV.
 * @returns {Promise<string>} - Resolves with the file path after writing.
 */
exports.writeCSV = async (
  columns,
  data,
  filePath = "./exports/output.csv",
  delimiter = ",",
  append = false
) => {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: columns.map((col) => ({ id: col, title: col })),
    fieldDelimiter: delimiter,
    append, // << Key line
  });

  await csvWriter.writeRecords(data);
  return filePath;
};

/**
 * Reads data from a CSV file with optional delimiter.
 * @param {string} filePath - The CSV file path.
 * @param {array} columns - Array of columns to extract.
 * @param {string} [delimiter=','] - Delimiter used in the CSV file.
 * @returns {Promise<array>} - Resolves with an array of filtered records.
 */
exports.readCSV = (filePath, columns, delimiter = ",") => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: delimiter }))
      .on("data", (row) => {
        let filtered = {};
        columns.forEach((col) => {
          if (row.hasOwnProperty(col)) {
            filtered[col] = row[col];
          }
        });
        results.push(filtered);
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

/**
 * Reads only the header row from a CSV file with optional delimiter.
 * @param {string} filePath - The CSV file path.
 * @param {string} [delimiter=','] - Delimiter used in the CSV file.
 * @returns {Promise<array>} - Resolves with an array of header strings.
 */
exports.getHeaders = (filePath, delimiter = ",") => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ separator: delimiter }))
      .on("headers", (hdrs) => resolve(hdrs))
      .on("error", (err) => reject(err));
  });
};
