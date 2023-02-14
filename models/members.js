import mongoose, { Schema } from "mongoose";

const MemberSchema = new Schema(
  {
    fullName: String,
    lc_username: String,
    github_username: String,
    stats: [
      {
        week: Number,
        numProblems: Number,
        numSolved: Number,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// statics method that finds top 10 members by number of problems solved
MemberSchema.statics.findTop10 = function () {
  return this.aggregate([
    { $unwind: "$stats" },
    {
      $group: {
        _id: "$lc_username",
        numProblems: { $sum: "$stats.numProblems" },
        numSolved: { $sum: "$stats.numSolved" },
      },
    },
    { $sort: { numSolved: -1 } },
    { $limit: 10 },
  ]);
};

// statics method that finds top 10 members by number of problems solved
MemberSchema.statics.findTop10ByWeek = function (week) {
  return this.aggregate([
    { $unwind: "$stats" },
    { $match: { "stats.week": week } },
    {
      $group: {
        _id: "$lc_username",
        numProblems: { $sum: "$stats.numProblems" },
        numSolved: { $sum: "$stats.numSolved" },
      },
    },
    { $sort: { numSolved: -1 } },
    { $limit: 10 },
  ]);
};

MemberSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Member", MemberSchema);
