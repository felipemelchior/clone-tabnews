import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

async function fetchData() {
  const response = await fetch("http://localhost:3000/api/v1/status/user");
  return response;
}

describe("GET /api/v1/status/user", () => {
  describe("Anonymous user", () => {
    test("Retrieving the database page", async () => {
      const response = await fetchData();
      expect(response.status).toBe(200);
    });
    test("Retrieving the current database user", async () => {
      const response = await fetchData();
      const responseBody = await response.json();
      expect(responseBody).toEqual({ current_user: "postgres" });
    });
  });
});
