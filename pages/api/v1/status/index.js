import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("select current_user;");
  console.log(result.rows);
  response.status(200).json({ status: "Healthy" });
}

export default status;
