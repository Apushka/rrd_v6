import React, { useState } from "react";
import { Link, Navigate, Outlet, useParams, useRoutes } from "react-router-dom";

const UsersLayout = () => {
  return (
    <div>
      <h1>Users Layout</h1>
      <Link to="/">Main Page</Link>
      <Outlet />
    </div>
  );
};

const UserListPage = () => {
  const [users] = useState([1, 2, 3, 4, 5]);
  return (
    <>
      <h1>Users List Page</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <Link to={`/users/${user}`}>User {user}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserInfoPage = () => {
  const { userId } = useParams();
  return (
    <>
      <h1>User Page</h1>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p>userId: {userId}</p>
    </>
  );
};

const EditUserPage = () => {
  const { userId } = useParams();
  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User Profile Page</Link>
        </li>
        <li>
          <Link to={`/users/${Number(userId) + 1}/profile`}>Another User</Link>
        </li>
        <li>
          <Link to={`/users`}>Users List Page</Link>
        </li>
      </ul>
    </>
  );
};

const MainPage = () => {
  return <h1>Main Page</h1>;
};

const routes = [
  { path: "/", element: <MainPage /> },
  {
    path: "users",
    element: <UsersLayout />,
    children: [
      { path: "", element: <UserListPage /> },
      {
        path: ":userId",
        children: [
          { path: "", element: <Navigate to="profile" /> },
          { path: "profile", element: <UserInfoPage /> },
          { path: "edit", element: <EditUserPage /> },
          { path: "*", element: <Navigate to="profile" /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
];

function App() {
  const elements = useRoutes(routes);

  return (
    <>
      <h1>App Layout</h1>
      <Link to="/users">Users List Page</Link>
      {elements}
    </>
  );
}

export default App;
