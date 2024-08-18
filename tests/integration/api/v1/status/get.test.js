test("GET /api/v1/status should return 200 and updated_at", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Object.keys(responseBody)).toStrictEqual([
    "updated_at",
    "dependencies",
  ]);
  expect(Object.keys(responseBody.dependencies)).toStrictEqual(["database"]);
  expect(Object.keys(responseBody.dependencies.database)).toStrictEqual([
    "version",
    "max_connections",
    "opened_connections",
  ]);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(
    responseBody.dependencies.database.opened_connections,
  ).toBeLessThanOrEqual(responseBody.dependencies.database.max_connections);
});
