import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap"; // Import Bootstrap components

const MatchForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    matchId: "",
    stats: {
      teamA: {
        goals: "",
        possession: "",
        passes: "",
        shots: "",
        shotsOnTarget: "",
        corners: "",
      },
      teamB: {
        goals: "",
        possession: "",
        passes: "",
        shots: "",
        shotsOnTarget: "",
        corners: "",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/createMatch", formData);
      // Optionally reset form fields or navigate to another page
      console.log("Match created successfully");
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    const [team, stat] = name.split(".");
    setFormData((prevState) => ({
      ...prevState,
      stats: {
        ...prevState.stats,
        [team]: {
          ...prevState.stats[team],
          [stat]: value,
        },
      },
    }));
  };

  return (
    <div>
      <h1>Create Match</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formMatchId">
          <Form.Label>Match ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter match ID"
            name="matchId"
            value={formData.matchId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamAGoals">
          <Form.Label>Team A Goals</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter goals"
            name="stats.teamA.goals"
            value={formData.stats.teamA.goals}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamBGoals">
          <Form.Label>Team B Goals</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter goals"
            name="stats.teamB.goals"
            value={formData.stats.teamB.goals}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamAPossession">
          <Form.Label>Team A Possession</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter possession %"
            name="stats.teamA.possession"
            value={formData.stats.teamA.possession}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamBPossession">
          <Form.Label>Team B Possession</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter possession %"
            name="stats.teamB.possession"
            value={formData.stats.teamB.possession}
            onChange={handleTeamChange}
          />
        </Form.Group>
        {/* Add more form fields for other match details here */}
        <Form.Group controlId="formTeamAPasses">
          <Form.Label>Team A Passes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter passes"
            name="stats.teamA.passes"
            value={formData.stats.teamA.passes}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamBPasses">
          <Form.Label>Team B Passes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter passes"
            name="stats.teamB.passes"
            value={formData.stats.teamB.passes}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamAShots">
          <Form.Label>Team A Shots</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shots"
            name="stats.teamA.shots"
            value={formData.stats.teamA.shots}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamBShots">
          <Form.Label>Team B Shots</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shots"
            name="stats.teamB.shots"
            value={formData.stats.teamB.shots}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamAShotsOnTarget">
          <Form.Label>Team A Shots on Target</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shots on target"
            name="stats.teamA.shotsOnTarget"
            value={formData.stats.teamA.shotsOnTarget}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamBShotsOnTarget">
          <Form.Label>Team B Shots on Target</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shots on target"
            name="stats.teamB.shotsOnTarget"
            value={formData.stats.teamB.shotsOnTarget}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamACorners">
          <Form.Label>Team A Corners</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter corners"
            name="stats.teamA.corners"
            value={formData.stats.teamA.corners}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Form.Group controlId="formTeamBCorners">
          <Form.Label>Team B Corners</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter corners"
            name="stats.teamB.corners"
            value={formData.stats.teamB.corners}
            onChange={handleTeamChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Match
        </Button>
      </Form>
    </div>
  );
};

export default MatchForm;
