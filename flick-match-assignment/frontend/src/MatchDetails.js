import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Table } from "react-bootstrap";

const MatchById = () => {
  const [matchId, setMatchId] = useState("");
  const [match, setMatch] = useState(null);

  const handleChange = (e) => {
    setMatchId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8000/getMatchStats/${matchId}`
      );
      setMatch(response.data);
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  };

  return (
    <div>
      <h1>Match Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMatchId">
          <Form.Label>Match ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter match ID"
            value={matchId}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Fetch Match
        </Button>
      </Form>
      <br />
      {match && (
        <Card>
          <Card.Body>
            <Card.Title>Match ID: {match.matchId}</Card.Title>
            <Card.Text>Date: {match.date}</Card.Text>
            {/* Display other match details as needed */}
            {match && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Statistic</th>
                    <th>Team A</th>
                    <th>Team B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Goals</td>
                    <td>{match.stats.teamA.goals}</td>
                    <td>{match.stats.teamB.goals}</td>
                  </tr>
                  <tr>
                    <td>Possession (%)</td>
                    <td>{match.stats.teamA.possession}</td>
                    <td>{match.stats.teamB.possession}</td>
                  </tr>
                  <tr>
                    <td>Total Passes</td>
                    <td>{match.stats.teamA.passes}</td>
                    <td>{match.stats.teamB.passes}</td>
                  </tr>
                  <tr>
                    <td>Shots</td>
                    <td>{match.stats.teamA.shots}</td>
                    <td>{match.stats.teamB.shots}</td>
                  </tr>
                  <tr>
                    <td>Shots on Target</td>
                    <td>{match.stats.teamA.shotsOnTarget}</td>
                    <td>{match.stats.teamB.shotsOnTarget}</td>
                  </tr>
                  <tr>
                    <td>Corners</td>
                    <td>{match.stats.teamA.corners}</td>
                    <td>{match.stats.teamB.corners}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MatchById;
