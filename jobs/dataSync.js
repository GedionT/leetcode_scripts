import cron from "node-cron";
import logger from "../utils/logger.js";
// import { google } from "googleapis";
// import { OAuth2Client } from "google-auth-library";
// import { MongoClient } from "mongodb";
// import { googleSheetId, googleSheetRange } from "./config.js";

// const client = new OAuth2Client("client_id", "client_secret", "redirect_uris");

const sync_data = async () => {
  const db = await MongoClient.connect("mongodb://localhost:27017");
  const collection = db.collection("members");
  await collection.deleteMany({});
  // const token = await client.getAccessToken();
  // const sheets = google.sheets({ version: "v4", auth: client });
  // const res = await sheets.spreadsheets.values.get({
  //   spreadsheetId: googleSheetId,
  //   range: googleSheetRange,
  // });
  // const rows = res.data.values;
  // const members = rows.map((row) => {
  //   return {
  //     fullName: row[0],
  //     lc_username: row[1],
  //     github_username: row[2],
  //     stats: [],
  //   };
  // });

  // const result = await collection.insertMany(members, {
  //   ordered: false,
  // });
  console.log(result);
  logger.log("info", "sync data with google sheet success");
  db.close();
};

// cron function that runs every saturday at midnight
// drops existing data and onboard all data to our database
export default cron.schedule("0 0 * * 6", () => {
  console.log("----------------------------------------------------");
  console.log("Task run: saturday midnight sync data with google sheet");
  console.log("----------------------------------------------------");
  sync_data();
  logger.info("sync data with google sheet success");
});
