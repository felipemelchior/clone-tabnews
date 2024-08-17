import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("select 1+1 as sum;");
  response.status(200).json({ status: "Healthy" });
}

export default status;
