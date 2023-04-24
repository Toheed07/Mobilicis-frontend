import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const Home = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${filter}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container">
      <div className="filter">
        Filter by:
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All Users</option>
          <option value="income-bmw-mercedes">
            Income less $5 USD and car brand BMW or Mercedes
          </option>
          <option value="male-phone-price">
            Male Users with phone price more then $10,000
          </option>
          <option value="last-name-quote-email">
            Users whose last name starts with “M” and has a quote character
            length greater than 15 and email includes his/her last name.
          </option>
          <option value="car-brand-email">
            Users which have a car of brand “BMW”, “Mercedes” or “Audi” and
            whose email does not include any digit.
          </option>
          <option value="top-cities">
            Top 10 cities with highest number of users and their average income
          </option>
        </select>
      </div>
      <div className="table-wrapper">
        <Table bordered hover>
          <thead>
            {filter === "top-cities" ? (
              <tr>
                <th>City</th>
                <th>Number of Users</th>
                <th>Average Income</th>
              </tr>
            ) : (
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Income</th>
                <th>City</th>
                <th>Car</th>
                <th>Quote</th>
                <th>Phone Price</th>
              </tr>
            )}
          </thead>
          <tbody>
            {filter === "top-cities"
              ? data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.city}</td>
                    <td>{user.users}</td>
                    <td>{user.avgIncome ? user.avgIncome.toFixed(2) : ""}</td>
                  </tr>
                ))
              : data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.income}</td>
                    <td>{user.city}</td>
                    <td>{user.car}</td>
                    <td>{user.quote}</td>
                    <td>${user.phone_price}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
