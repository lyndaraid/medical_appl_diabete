import { AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import { useState } from 'react';

const activeStyle = {
  backgroundColor: '#ccc', // Set your desired background color for active items
  color: '#fff',
  borderRadius: 5,
};

const iconSize = 14; // Set your desired icon size

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={NavLink}
            to="/"
            sx={{ textDecoration: 'none', color: 'grey.50', marginLeft: 2 }}
          >
            GlucoApp
          </Typography>
          <List
            sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'flex' }, gap: 0 }}
            component="nav"
          >
            <ListItem
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              component={NavLink}
              to="/"
              button
            >
              <ListItemIcon sx={{ fontSize: iconSize, color: '#fff' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component={NavLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="aideDiagnostic"
              button
            >
              <ListItemIcon sx={{ fontSize: iconSize, color: '#fff' }}>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary="Diagnostic" />
            </ListItem>
            <ListItem
              component={NavLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="about"
              button
            >
              <ListItemIcon sx={{ fontSize: iconSize, color: '#fff' }}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem
              component={NavLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="contact"
              button
            >
              <ListItemIcon sx={{ fontSize: iconSize, color: '#fff' }}>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem
              component={NavLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="Logout"
              button
            >
              <ListItemIcon sx={{ fontSize: iconSize, color: '#fff' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose} >
  <List>
    <ListItem
      component={NavLink}
      to="/"
      onClick={handleDrawerClose}
      button
    >
      <ListItemIcon sx={{ fontSize: iconSize, color: '#ccc' }}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem
      component={NavLink}
      to="aideDiagnostic"
      onClick={handleDrawerClose}
      button
    >
      <ListItemIcon sx={{ fontSize: iconSize, color: '#ccc' }}>
        <HelpOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Diagnostic" />
    </ListItem>
    <ListItem
      component={NavLink}
      to="about"
      onClick={handleDrawerClose}
      button
    >
      <ListItemIcon sx={{ fontSize: iconSize, color: '#ccc' }}>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
    <ListItem
      component={NavLink}
      to="contact"
      onClick={handleDrawerClose}
      button
    >
      <ListItemIcon sx={{ fontSize: iconSize, color: '#ccc' }}>
        <ContactMailIcon />
      </ListItemIcon>
      <ListItemText primary="Contact" />
    </ListItem>
    <ListItem
      component={NavLink}
      to="Logout"
      onClick={handleDrawerClose}
      button
    >
      <ListItemIcon sx={{ fontSize: iconSize, color: '#ccc' }}>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </List>
</Drawer>

    </>
  );
};

export default Navbar;
