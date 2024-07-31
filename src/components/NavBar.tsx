import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  CssBaseline,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useThemeContext } from '../contexts/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    marginRight: '1rem',
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
  },
}));

/**
 * NavBar component renders the main navigation bar with theme switcher and language switcher.
 * It includes links to Home, About, Contact, and Private routes.
 * The theme can be toggled between light and dark modes.
 * The language can be switched between various options.
 * @component
 * @returns {JSX.Element} The rendered NavBar component.
 */
const NavBar: React.FC = () => {
  const classes = useStyles();
  const { toggleTheme, mode } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  const drawerContent = (
    <div
      className={classes.list}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary={t('welcome')} />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary={t('about')} />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemText primary={t('contact')} />
        </ListItem>
        <ListItem button component={Link} to="/private">
          <ListItemText primary="Private" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.grow}>
            MyApp
          </Typography>
          <Button color="inherit" onClick={handleLanguageMenuOpen}>
            {i18n.language.toUpperCase()}
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={() => changeLanguage('en')}>EN</MenuItem>
            <MenuItem onClick={() => changeLanguage('fr')}>FR</MenuItem>
            <MenuItem onClick={() => changeLanguage('es')}>ES</MenuItem>
            <MenuItem onClick={() => changeLanguage('de')}>DE</MenuItem>
          </Menu>
          <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default NavBar;
