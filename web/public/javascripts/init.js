/* eslint-disable */
$(document).ready(() => {
  $('.tabs').tabs()
  $('.sidenav').sidenav({swipeable: true})
  $('.modal').modal();
  // $('.materialboxed').materialbox();

  $('.fixed-action-btn').floatingActionButton({
   direction: 'top', // Direction menu comes out
   hoverEnabled: false, // Hover enabled
   toolbarEnabled: false // Toolbar transition enabled
  })

  const userProfile = $('.userProfile')

  $(document).on('click', '.doLogin', function() {
    const provider = $(this).data('provider');
    handleLogin(provider)
  })

  $(document).on('click', '.doLogout', function() {
    handleLogout()
  })

  const config = {
    apiKey: "AIzaSyBoQNYBMi7ylKBl4kCdnLKLvleLVhF3Z5g",
    authDomain: "dersim-app.firebaseapp.com",
    databaseURL: "https://dersim-app.firebaseio.com",
    projectId: "dersim-app",
    storageBucket: "dersim-app.appspot.com",
    messagingSenderId: "289069095959"
  };

  firebase.initializeApp(config)
  const token = localStorage.getItem('token')

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
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
        }).then((res) => console.log(res))
    } else {
      localStorage.setItem('token', null)
      // eslint-disable-next-line no-undef
      fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin'
      })
    }
  })

  function handleLogin (provider) {
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
      .then(result => {
        const {name, photoURL, displayName} = result.user;

        $('.name').text(displayName)
        M.toast({html: `Hoşgeldin ${displayName}`, classes: 'rounded'});

        const elem = document.querySelector('#login');
        const instance = new M.Modal.getInstance(elem);
        instance.close()

        userProfile.html(`<img class="modal-trigger circle" href="#settings" src="${photoURL}" alt="" width="42" style="position:absolute;margin-top:15px;margin-left:-15px;">`)
        localStorage.setItem('token', result.credential.accessToken)
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
  }

  function handleLogout () {
    userProfile.html('<i class="modal-trigger material-icons account-icon" href="#login">account_circle</i>')
    $('.name').text('')

    const elem = document.querySelector('#settings');
    const instance = new M.Modal.getInstance(elem);
    instance.close()
    localStorage.setItem('token', null)
    firebase.auth().signOut()
    M.toast({html: `Tekrar görüşmek üzere..`, classes: 'rounded'});
  }

  window.handleLogin = handleLogin;
  window.handleLogout = handleLogout;
})
