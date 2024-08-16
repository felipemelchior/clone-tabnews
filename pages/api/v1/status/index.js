function status(request, response) {
  response.status(200).json({ status: "Healthy" });
}

export default status;
