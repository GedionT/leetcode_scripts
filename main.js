// import listOfUsernames from "./mock_data/userlists";
import express from "express";
// import usernameRecentActivity from "./service/fetchActivity";
import dataSync from "./jobs/dataSync.js";
import updatePerfAndRank from "./jobs/updatePerfAndRank.js";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// handle errors
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

// start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");

  setTimeout(() => {
    console.log("Jobs scheduled");
    dataSync;
    updatePerfAndRank;
  }, 5000);
});
