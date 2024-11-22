import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _, res) => {
  console.error(error.stack)

  return res.status(500).json({
    ok: false,
    message: "Internal server error: " + error.message
  });
};
