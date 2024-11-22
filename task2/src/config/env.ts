export const PG_HOST = process.env["PG_HOST"] || "localhost";
export const PG_PORT = parseInt(process.env["PG_PORT"] || "5432")
export const PG_USER = process.env["PG_USER"] || "root";
export const PG_PASS = process.env["PG_PASS"] || "root";
export const PG_DATABASE = process.env["PG_DATABASE"] || "some-db";

export const PG_CONNECTION_STRING = `postgres://${PG_USER}:${PG_PASS}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;
export const RABBIT_MQ_HOST = process.env["RABBIT_MQ_HOST"] || "localhost";
