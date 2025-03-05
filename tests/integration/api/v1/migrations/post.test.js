import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Retrieving pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetchData();
        const responseBody = await response.json();
        const migrations = await database.query(
          "SELECT COUNT(*)::INT FROM public.pgmigrations",
        );
        const migrationsCount = migrations.rows[0].count;

        expect(response.status).toBe(201);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
        expect(migrationsCount).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const response2 = await fetchData();
        const responseBody2 = await response2.json();
        expect(response2.status).toBe(200);
        expect(Array.isArray(responseBody2)).toBe(true);
        expect(responseBody2.length).toBe(0);
      });
    });
  });
});

async function fetchData() {
  return await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
}
