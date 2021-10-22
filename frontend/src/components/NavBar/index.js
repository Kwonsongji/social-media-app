import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  //state = { activeItem: 'home' }
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [ activeItem, setActiveItem] = useState(path)
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  const handleItemClick = (e, { name }) => setActiveItem(name);

  /* render() {
    const { activeItem } = this.state
 */
    return (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          /*  onClick={this.handleItemClick} */
            as={NavLink}
            to="/"
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={NavLink}
              to="/login"
            />
        </Menu.Menu>
         <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={NavLink}
            to="/register"
          />
        </Menu>

   
    )
  
}

export default NavBar;