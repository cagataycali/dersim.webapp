/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Avatar from 'material-ui/Avatar';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Link from 'next/link'
// Firebase
import firebase from '../firebase'
import 'isomorphic-fetch'
import clientCredentials from '../credentials/client'


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    margin: 8
  }
});

class MenuAppBar extends React.Component {
  static async getInitialProps ({req, query}) {
    const user = req && req.session ? req.session.decodedToken : null
    // don't fetch anything from firebase if the user is not found
    return { user }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      anchorEl: null,
    }
  }

  componentDidMount () {
    // firebase.initializeApp(clientCredentials)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('state changed user', user);
        this.setState({ user: user })
        return user.getIdToken()
          .then((token) => {
            // eslint-disable-next-line no-undef
            return fetch('/api/login', {
              method: 'POST',
              // eslint-disable-next-line no-undef
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: JSON.stringify({ token })
            })
          })
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        })
      }
    })
  }

  handleLogin (provider) {
    let authProvider;
    switch (provider) {
      case 'google':
        authProvider = new firebase.auth.GoogleAuthProvider()
        break;
      case 'twitter':
        authProvider = new firebase.auth.TwitterAuthProvider()
        break;
      case 'facebook':
        authProvider = new firebase.auth.FacebookAuthProvider()
        break;
      default:
    }
    firebase.auth().signInWithPopup(authProvider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(result)
        const {displayName, email, photoURL} = user
        // ...
        console.log(displayName, email, photoURL, token)
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code
        // const errorMessage = error.message
        // The email of the user's account used.
        // const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential
        console.log(error)
      })
      this.setState({ anchorEl: null });
  }

  handleLogout () {
    firebase.auth().signOut()
    this.setState({ anchorEl: null });
  }

  // state = {
  //   auth: true,
  //   anchorEl: null,
  // };
  //
  // handleChange = (event, checked) => {
  //   this.setState({ auth: checked });
  // };
  //
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };
  //
  // handleLogout = () => {
  //   this.setState({ auth: false });
  // }

  render () {
    const { classes } = this.props;
    const { user, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Link href='/'>
              <Typography type="title" color="inherit" className={classes.flex}>
                Ders.im
              </Typography>
            </Link>

            <div>
            {user ? (
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="contrast"
              >
                <Avatar src={user.photoURL}></Avatar>
              </IconButton>
            ) : (
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="contrast"
              >
                <AccountCircle />
              </IconButton>
            )}

              {user ? (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onRequestClose={this.handleRequestClose}
                >
                  <Link href='/profil'>
                    <MenuItem onClick={this.handleRequestClose}>Profil</MenuItem>
                  </Link>
                  <MenuItem onClick={this.handleLogout}>Çıkış yap</MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onRequestClose={this.handleRequestClose}
                >
                <MenuItem onClick={this.handleLogin.bind(this, 'facebook')}>Facebook</MenuItem>
                <MenuItem onClick={this.handleLogin.bind(this, 'twitter')}>Twitter</MenuItem>
                <MenuItem onClick={this.handleLogin.bind(this, 'google')}>Google</MenuItem>
                </Menu>
              )}

            </div>

          </Toolbar>
        </AppBar>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
