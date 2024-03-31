import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap"; // Import Bootstrap components

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getAllMatches")
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
      });
  }, []);

  return (
    <div>
      <h1>Matches</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Match ID</th>
            <th>Team A Goals</th>
            <th>Team B Goals</th>
            <th>Team A Possession</th>
            <th>Team B Possession</th>
            <th>Team A Passes</th>
            <th>Team B Passes</th>
            <th>Team A Shots</th>
            <th>Team B Shots</th>
            <th>Team A Shots on Target</th>
            <th>Team B Shots on Target</th>
            <th>Team A Corners</th>
            <th>Team B Corners</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id}>
              <td>{match.date}</td>
              <td>{match.matchId}</td>
              <td>{match.stats.teamA.goals}</td>
              <td>{match.stats.teamB.goals}</td>
              <td>{match.stats.teamA.possession}</td>
              <td>{match.stats.teamB.possession}</td>
              <td>{match.stats.teamA.passes}</td>
              <td>{match.stats.teamB.passes}</td>
              <td>{match.stats.teamA.shots}</td>
              <td>{match.stats.teamB.shots}</td>
              <td>{match.stats.teamA.shotsOnTarget}</td>
              <td>{match.stats.teamB.shotsOnTarget}</td>
              <td>{match.stats.teamA.corners}</td>
              <td>{match.stats.teamB.corners}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MatchList;
