import database from "infra/database";

async function currentUser(request, response) {
  const result = await database.query("select current_user;");
  response.status(200).json(result.rows[0]);
}

export default currentUser;
