require('dotenv').config();

const BASE_URLS = {
  ddyo: process.env.FIRAT_DDYO_URL,
  main: process.env.FIRAT_MAIN_URL,
  abs: process.env.FIRAT_ABS_URL,
};

const TOKENS = {
  main: process.env.MAIN_TOKEN,
  abs: process.env.ABS_TOKEN,
};

const APP_CONFIG = {
  env: process.env.APP_ENV || "production",
  debug: process.env.APP_DEBUG === "true",
};

module.exports = {
  BASE_URLS,
  TOKENS,
  APP_CONFIG,
};
