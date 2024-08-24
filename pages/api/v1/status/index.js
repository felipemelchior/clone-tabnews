import database from "infra/database.js";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const result = await database.query({
    text: "SELECT split_part(version(), ' ', 2) AS postgres_version, current_setting('max_connections')::int AS max_connections, count(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseVersionValue = result.rows[0].postgres_version;
  const maxConnectionsValue = result.rows[0].max_connections;
  const openedConnectionsValue = result.rows[0].opened_connections;

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        opened_connections: openedConnectionsValue,
      },
    },
  });
}

export default status;
