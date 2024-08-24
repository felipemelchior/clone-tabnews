const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready -h localhost", (err, stdout) => {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres is ready and accepting connections\n");
  });
}

process.stdout.write("🔴 Postgres not accepting connections yet ");
checkPostgres();
