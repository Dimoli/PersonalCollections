import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import useHttp from "../hooks/useHttp";

export default ({ divineAccess }) => {
  const { loading, request, error } = useHttp();
  const [usersData, setUsersData] = useState(divineAccess.users);
  const [checkboxes, setCheckboxes] = useState(
    divineAccess.users.map(() => false)
  );
  const [mainCheckbox, setMainCheckbox] = useState(false);

  const handleBlock = async () => {
    const blockedUsers = usersData
      .filter((user, index) => checkboxes[index])
      .map((user) => user.email);

    const updatedUsers = await request(
      "/api/admin-operations/block-users",
      "PATCH",
      blockedUsers
    );
    setUsersData(updatedUsers.users);
  };

  const handleUp = async () => {
    const uppedUsers = usersData
      .filter((user, index) => checkboxes[index])
      .map((user) => user.email);

    const updatedUsers = await request(
      "/api/admin-operations/up-users",
      "PATCH",
      uppedUsers
    );
    setUsersData(updatedUsers.users);
  };

  const handleDelete = async () => {
    const deletedUsers = usersData
      .filter((user, index) => checkboxes[index])
      .map((user) => user.email);

    const updatedUsers = await request(
      "/api/admin-operations/delete-users",
      "PATCH",
      deletedUsers
    );
    setUsersData(updatedUsers.users);
  };

  const handleCheckbox = (index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, id) =>
      id === index ? !checkbox : checkbox
    );

    setCheckboxes(updatedCheckboxes);
  };

  const handleMainCheckbox = () => {
    setMainCheckbox(!mainCheckbox);
    setCheckboxes(checkboxes.map((checkbox) => !mainCheckbox));
  };

  return (
    <Col>
      <Row>
        <Col>
          <Button variant="warning" className="w-100" onClick={handleBlock}>
            Block user
          </Button>
        </Col>
        <Col>
          <Button variant="success" className="w-100" onClick={handleUp}>
            Assign user as admin
          </Button>
        </Col>
        <Col>
          <Button variant="danger" className="w-100" onClick={handleDelete}>
            Delete user
          </Button>
        </Col>
      </Row>
      <Row>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>
                <span className="mr-3">Select all</span>
                <input
                  type="checkbox"
                  checked={mainCheckbox}
                  onChange={handleMainCheckbox}
                />
              </th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td>
                  <input
                    type="checkbox"
                    checked={checkboxes[index]}
                    onChange={() => handleCheckbox(index)}
                  />
                </td>
                <NavLink to={`/${user.email}`}>
                  <th>{user.email}</th>
                </NavLink>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>{user.active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </Col>
  );
};
