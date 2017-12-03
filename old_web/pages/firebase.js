// import React, { Component } from 'react'
// import firebase from 'firebase'
// import 'isomorphic-fetch'
// import clientCredentials from '../credentials/client'
//
// export default class Index extends Component {
//   static async getInitialProps ({req, query}) {
//     const user = req && req.session ? req.session.decodedToken : null
//     // don't fetch anything from firebase if the user is not found
//     const snap = user && await req.firebaseServer.database().ref('messages').once('value')
//     const messages = snap && snap.val()
//     return { user, messages }
//   }
//
//   constructor (props) {
//     super(props)
//     this.state = {
//       user: this.props.user,
//       value: '',
//       messages: this.props.messages
//     }
//
//     this.addDbListener = this.addDbListener.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//
//   componentDidMount () {
//     firebase.initializeApp(clientCredentials)
//
//     if (this.state.user) this.addDbListener()
//
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         this.setState({ user: user })
//         return user.getIdToken()
//           .then((token) => {
//             // eslint-disable-next-line no-undef
//             return fetch('/api/login', {
//               method: 'POST',
//               // eslint-disable-next-line no-undef
//               headers: new Headers({ 'Content-Type': 'application/json' }),
//               credentials: 'same-origin',
//               body: JSON.stringify({ token })
//             })
//           }).then((res) => this.addDbListener())
//       } else {
//         this.setState({ user: null })
//         // eslint-disable-next-line no-undef
//         fetch('/api/logout', {
//           method: 'POST',
//           credentials: 'same-origin'
//         }).then(() => firebase.database().ref('messages').off())
//       }
//     })
//   }
//
//   addDbListener () {
//     firebase.database().ref('messages').on('value', snap => {
//       const messages = snap.val()
//       if (messages) this.setState({ messages })
//     })
//   }
//
//   handleChange (event) {
//     this.setState({ value: event.target.value })
//   }
//
//   handleSubmit (event) {
//     event.preventDefault()
//     const date = new Date().getTime()
//     firebase.database().ref(`messages/${date}`).set({
//       id: date,
//       text: this.state.value
//     })
//     this.setState({ value: '' })
//   }
//
//   handleLogin (provider) {
//     let authProvider;
//     switch (provider) {
//       case 'google':
//         authProvider = new firebase.auth.GoogleAuthProvider()
//         break;
//       case 'twitter':
//         authProvider = new firebase.auth.TwitterAuthProvider()
//         break;
//       case 'facebook':
//         authProvider = new firebase.auth.FacebookAuthProvider()
//         break;
//       default:
//
//     }
//     firebase.auth().signInWithPopup(authProvider)
//       .then((result) => {
//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         const token = result.credential.accessToken
//         // The signed-in user info.
//         const user = result.user
//         console.log(result)
//         const {displayName, email, photoURL} = user
//         // ...
//         console.log(displayName, email, photoURL, token)
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         // const errorCode = error.code
//         // const errorMessage = error.message
//         // The email of the user's account used.
//         // const email = error.email
//         // The firebase.auth.AuthCredential type that was used.
//         // const credential = error.credential
//         console.log(error)
//       })
//   }
//
//   handleLogout () {
//     firebase.auth().signOut()
//   }
//
//   render () {
//     const { user, value, messages } = this.state
//
//     return <div>
//       {
//         user
//         ? <button onClick={this.handleLogout}>Logout</button>
//         : <div><button onClick={this.handleLogin.bind(this, 'google')}>Login via Google</button><button onClick={this.handleLogin.bind(this, 'facebook')}>Login via Facebook</button><button onClick={this.handleLogin.bind(this, 'twitter')}>Login via Twitter</button></div>
//       }
//       {
//         user &&
//         <div>
//           <form onSubmit={this.handleSubmit}>
//             <input
//               type={'text'}
//               onChange={this.handleChange}
//               placeholder={'add message'}
//               value={value}
//             />
//           </form>
//           <ul>
//             {
//               messages &&
//               Object.keys(messages).map(key => <li key={key}>{messages[key].text}</li>)
//             }
//           </ul>
//         </div>
//       }
//     </div>
//   }
// }
