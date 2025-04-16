// services/clickhouseService.js
const { ClickHouse } = require("clickhouse");

exports.createClient = (config) => {
  return new ClickHouse({
    url: config.host,
    // || "https://op8nibuz3o.ap-south-1.aws.clickhouse.cloud:8443"
    port: config.port || 8443,
    // JWT token is used here as the password in basicAuth.
    basicAuth: {
      username: config.username || "default",
      password: config.token || "V.xGrN4B~iFwo",
    },
    debug: false,
    isUseGzip: false,
    format: "json", // Returns results in JSON format
    config: {
      database: config.database || "default",
      session_id: "session_id if needed",
      session_timeout: 30,
    },
  });
};

function createClient(config) {
  return new ClickHouse({
    url: config.host,
    // || "https://op8nibuz3o.ap-south-1.aws.clickhouse.cloud:8443"
    port: config.port || 8443,
    // JWT token is used here as the password in basicAuth.
    basicAuth: {
      username: config.username || "default",
      password: config.token || "V.xGrN4B~iFwo",
    },
    debug: false,
    isUseGzip: false,
    format: "json", // Returns results in JSON format
    config: {
      database: config.database || "default",
      session_id: "session_id if needed",
      session_timeout: 30,
    },
  });
}

exports.fetchData = (config, table, columns) => {
  const client = createClient(config);
  const query = `SELECT ${columns.join(", ")} FROM ${table} LIMIT 100 `;
  // toPromise() converts the response to a usable array format.

  const stream = client.query(query).stream();
  //   const result = await client.query(query).toPromise();
  return stream;
};

exports.insertData = async (config, targetTable, records) => {
  // Inserting records into ClickHouse. We assume that 'records' is an array of objects.
  if (records.length === 0) return 0;
  const client = createClient(config);
  // Determine columns from the first record.
  const columns = Object.keys(records[0]);
  const query = `INSERT INTO ${targetTable} (${columns.join(
    ", "
  )}) FORMAT JSONEachRow`;
  // Insert records. The client library will handle converting records into JSONEachRow format.
  await client.insert(query, records).toPromise();
  return records.length;
};

exports.getTables = async (config) => {
  const client = createClient(config);
  // Query system tables for available tables in the provided database.
  const query = `SELECT name FROM system.tables WHERE database = '${config.database}'`;
  const result = await client.query(query).toPromise();
  // Map the results to extract only the table names.
  return result.map((row) => row.name);
};

exports.getColumns = async (config, tableName) => {
  const client = createClient(config);
  const query = `
      SELECT name, type 
      FROM system.columns 
      WHERE database = '${config.database}' 
      AND table = '${config.tableName}'
    `;
  const result = await client.query(query).toPromise();

  // Example output: [{ name: 'id', type: 'UInt32' }, { name: 'name', type: 'String' }]
  return result;
};
