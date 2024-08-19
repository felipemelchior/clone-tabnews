async function fetchData() {
  return await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
}

test("POST /api/v1/migrations should return status code 200", async () => {
  const response = await fetchData();
  console.log(await response.json());
  // const responseBody = await response.json();

  expect(response.status).toBe(200);
});
