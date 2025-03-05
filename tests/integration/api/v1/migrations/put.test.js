import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

async function fetchData() {
  return await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
}

describe("PUT /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Trying to use an different method", async () => {
      const response = await fetchData();
      expect(response.status).toBe(405);
    });
  });
});
