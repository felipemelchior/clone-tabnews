async function fetchData() {
  return await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
}

test("PUT /api/v1/migrations should return status code 405", async () => {
  const response = await fetchData();
  expect(response.status).toBe(405);
});
