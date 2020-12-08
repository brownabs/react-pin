import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import SearchInput from '../SearchInput';
import img from './pinterestLogo.png';

export default function MyNavbar(props) {
  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className='navbar-collection'>
      <Navbar color='white' dark expand='md' fixed="top" className='navbar justify-content-between'>
        <Link className="navbar-brand" to='/'><img src={img} alt='brand' width="35"
        height="35"></img></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link className="nav-link" to='/boards'>Boards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/pins'>
                Pins
              </Link>
            </NavItem>
          </Nav>
          <SearchInput />
          {/* "Optional chaining operator: (?.)" gives the prop time to load without throwing errors. Only use this if you know your props are correct and need time to load. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
          {
            user
            && <>
              <img className="userInfo ml-5" src={user?.photoURL} alt={user?.displayName} />
              <UncontrolledDropdown>
              <DropdownToggle nav caret>
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
                {user?.displayName}
                </DropdownItem>
                <DropdownItem>
                  <div
                    className='nav-link btn'
                    onClick={(e) => logMeOut(e)}
                  >
                    Logout
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}
