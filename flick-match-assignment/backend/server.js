const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

mongoose
  .connect(
    "mongodb+srv://akshithamittapalli:Vh6px0wdjkNDalry@cluster0.pmpmbxy.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const matchSchema = new mongoose.Schema({
  matchId: String,
  date: String,
  stats: {
    teamA: {
      goals: Number,
      possession: String,
      passes: Number,
      shots: Number,
      shotsOnTarget: Number,
      corners: Number,
    },
    teamB: {
      goals: Number,
      possession: String,
      passes: Number,
      shots: Number,
      shotsOnTarget: Number,
      corners: Number,
    },
  },
});

const Match = mongoose.model("Match", matchSchema);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/getMatchStats/:matchId", async (req, res) => {
  const { matchId } = req.params;
  console.log(matchId);
  try {
    const match = await Match.findOne({ matchId: matchId });

    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getAllMatches", async (req, res) => {
  try {
    const matches = await Match.find();

    res.json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/createMatch", async (req, res) => {
  try {
    const {
      date,
      matchId,
      stats: { teamA, teamB },
    } = req.body;

    // Create a new match entry in the database
    const newMatch = new Match({
      date,
      matchId,
      stats: {
        teamA: {
          goals: teamA.goals,
          possession: teamA.possession,
          passes: teamA.passes,
          shots: teamA.shots,
          shotsOnTarget: teamA.shotsOnTarget,
          corners: teamA.corners,
        },
        teamB: {
          goals: teamB.goals,
          possession: teamB.possession,
          passes: teamB.passes,
          shots: teamB.shots,
          shotsOnTarget: teamB.shotsOnTarget,
          corners: teamB.corners,
        },
      },
    });

    // Save the new match entry to the database
    await newMatch.save();

    res.status(201).json({ message: "Match created successfully" });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
