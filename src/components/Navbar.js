import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from 'antd';
import './Navbar.css';

const Navbar = () => (
  <PageHeader
    title="Enbermusic"
    subTitle="Simple music album CRUD."
    extra={[
      <Link key="artists" to="/artists">
        <Button type="text">Artists</Button>
      </Link>,
      <Link key="albums" to="/albums">
        <Button type="text">Albums</Button>
      </Link>,
      <Link key="songs" to="/songs">
        <Button type="text">Songs</Button>
      </Link>
    ]}
    className="app-navbar"
  />
);

export default Navbar;
