import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Stylesheets/FetchHistory.css";

function FetchHistory() {
  const [history, setHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchHistory(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchHistory = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHistory(response.data);
    } catch (err) {
      console.error("Error Fetching History", err);
      setHistory([]); // Clear history if an error occurs
    }
  };

  return (
    <div className="fetch">
      <div className="head-main">
        <div className="heading">
          <h2>Your Last 5 Codes</h2>
        </div>
      </div>

      {isLoggedIn ? (
        history.length > 0 ? (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th className="tableHeader">Code</th>
                  <th className="tableHeader">Result</th>
                  <th className="tableHeader">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr key={index}>
                    <td className="tableCell">
                      <pre className="tablePre">{entry.code}</pre>
                    </td>
                    <td className="tableCell">
                      <pre className="tablePre">{entry.result}</pre>
                    </td>
                    <td className="tableCell">
                      <pre className="tablePre">{entry.timestamp}</pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No history available.</p>
        )
      ) : (
        <p>Please log in to view your code history.</p>
      )}
    </div>
  );
}

export default FetchHistory;
