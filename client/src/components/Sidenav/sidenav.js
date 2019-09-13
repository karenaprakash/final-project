/**
 * sidenav : side navbar
 * 
 */
import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from '../SideNavItems/sidenavitems';


const Nav = (props) => {
    return (
      <SideNav
        showNav = {props.showNav}
        onHideNav = {props.onHideNav}
        navStyle = {{
            background : '#242424',
            maxWidth : '220px'
        }}
      >
          <SideNavItems onHideNav = {props.onHideNav} /> 
      </SideNav>
    );
};

export default Nav;