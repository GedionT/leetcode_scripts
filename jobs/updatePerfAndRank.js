import cron from "node-cron";
import logger from "../utils/logger.js";
import fs from "fs";
import { MongoClient } from "mongodb";

const updatePerformance = async () => {
  const db = await MongoClient.connect("mongodb://localhost:27017");
  const collection = db.collection("members");

  // get all members
  const members = await collection.find({}).toArray();

  // for each member, get their recent activity
  for (member of members) {
    const recentActivity = await usernameRecentActivity(member.lc_username);
    const stats = recentActivity.recentActivity;

    // update the member's stats
    await collection.updateOne(
      { lc_username: member.lc_username },
      { $set: { stats: stats } }
    );
  }

  const result = await collection.findTop10();
  fs.writeFileSync("../top10.txt", JSON.stringify(result), "utf8");
  db.close();
};

// a cron job that runs every sunday at midnight to update the performance of all members and rank
export default cron.schedule("0 0 * * 0", async () => {
  console.log("----------------------------------------------------");
  console.log("Task run: Sunday midnight rank and save top 10");
  console.log("----------------------------------------------------");
  await updatePerformance();
  logger.log("info", "rank and save top 10 success");
});
