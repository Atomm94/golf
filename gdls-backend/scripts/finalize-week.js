/* eslint-disable */
require("ts-node").register({
  typeCheck: process.env.NODE_ENV !== 'production',
});
require("dotenv").config();
require("reflect-metadata");

require("./finalize-week.ts");
