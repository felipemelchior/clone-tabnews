import database from "infra/database";

async function fetchData() {
  return await fetch("http://localhost:3000/api/v1/migrations");
}

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

beforeAll(cleanDatabase);

test("GET /api/v1/migrations should return status code 200", async () => {
  const response = await fetchData();
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
