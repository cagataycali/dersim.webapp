import * as firebase from 'firebase'
import 'isomorphic-fetch'
import config from './credentials/client'

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
