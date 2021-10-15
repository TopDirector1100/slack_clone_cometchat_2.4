import './Login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from '../../firebase'
import { CometChat } from '@cometchat-pro/chat'
import LogoImage from '../../images/logo.png'
import { Redirect } from 'react-router-dom';

//import { cometChat } from '../../app.config'
import { COMETCHAT_CONSTANTS } from '../../consts'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector  } from "react-redux";
import * as actions from '../../store/action';
import { createBrowserHistory } from 'history';

function Login() {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState("")
  const [authRedirect, setAuthRedirect] = useState(null)
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state)
  const history = createBrowserHistory();

  const signIn = () => {
    setLoading(true)
    auth
      .signInWithPopup(provider)
      .then((res) => {
        loginCometChat(res.user)
        
      })
      .catch((error) => {
        console.log('error = ', error)
        setLoading(false)
        alert(error.message)
      })
  }

  const loginCometChat = (data) => {
    const authKey = COMETCHAT_CONSTANTS.AUTH_KEY
    const resutl = dispatch( actions.auth( data.uid, authKey, data ) )

    setLoading(false)
    // CometChat.login(data.uid, authKey)
    //   .then((u) => {
    //     //localStorage.setItem('user', JSON.stringify(data))
    //     setIsLoggedIn("logged")
    //     console.log("logging in")
    //     console.log(u)
    //     window.location.href = '/embedded-app'
        
    //     setLoading(false)
    //   })
    //   .catch((error) => {
    //     if (error.code === 'ERR_UID_NOT_FOUND') {
    //       signUpWithCometChat(data)
    //     } else {
    //       console.log(error)
    //       setLoading(false)
    //       alert(error.message)
    //     }
    //   })
  }

  const signUpWithCometChat = (data) => {
    console.log('signup testing = ', data);
    const authKey = COMETCHAT_CONSTANTS.AUTH_KEY
    
    const user = new CometChat.User(data.uid)

    user.setName(data.displayName)
    user.setAvatar(data.photoURL)

    CometChat.createUser(user, authKey)
      .then(() => {
        setLoading(false)
        alert('You are now signed up, click the button again to login')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        alert(error.message)
      })
  }

  useEffect(() => {
    if(authUser.isLoggedIn) {
      console.log('auth user = ', authUser);
      setAuthRedirect(<Redirect to="/embedded-app" />)
    }

  });

  return (
    <div>
    {authRedirect}
      <div className="login">
        <div className="login__container">
          <img src={LogoImage} className="logo" alt="Slack Logo" />

          <h4>Sign in to CometChat</h4>
          <p>cometchat.slack.com</p>
          <Button onClick={signIn}>
            {!loading ? 'Sign In With Google' : <div id="loading"></div>}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login