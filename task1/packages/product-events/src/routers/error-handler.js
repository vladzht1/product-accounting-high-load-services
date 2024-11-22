/** @type {import("express").ErrorRequestHandler} */
export const errorHandler = (error, _, res) => {
  console.error(error.stack);

  res.status(500).json({
    ok: false,
    message: "Internal server error: " + error.message,
  });

  return;
};
