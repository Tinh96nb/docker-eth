import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {getUrlParams} from 'utils/helper/common';
import {menus} from 'utils/const';

export default class NavBar extends Component {
  renderListMenu() {
    const pathCurrent = getUrlParams();
    return menus.map((menu, index) => {
      return (
        <Link
          key={index}
          to={menu.path}
          className={pathCurrent===menu.path ? 'active nav-link' : 'nav-link'}
        >
          {menu.name}
        </Link>
      );
    })
  }
  render() {
    return (
    <Navbar bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">Doc Manager</Link>
      <Nav className="mr-auto">
        {this.renderListMenu()}
      </Nav>
    </Navbar>
    );
  }
}