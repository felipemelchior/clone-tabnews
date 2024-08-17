async function fetchData() {
  const response = await fetch("http://localhost:3000/api/v1/status/database");
  return response;
}

test("GET /api/v1/status/database should return status 200", async () => {
  const response = await fetchData();
  expect(response.status).toBe(200);
});

test("GET /api/v1/status/database should return postgres user", async () => {
  const response = await fetchData();
  expect(response.json()).resolves.toEqual({ current_user: "postgres" });
});
