import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
function Login() {
  const [newUser, setNewuser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: ''
  });

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then( res => {
      const {displayName, photoURL, email} = res.user;
      const isSignedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(isSignedInUser);

      // console.log(displayName, photoURL, email)
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  const handleSignOut =() =>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo:'',
        email: '',
        success: false
      }
      setUser(signedOutUser);
    })
    .catch(err => {

    })
  }
    
  const handleBlur =(e) =>{
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
    const handleSubmit = (e) =>{
      // console.log(user.email, user.password)
      if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log(res)
        })
        .catch( error => {
          // Handle Errors here.
          const newUserInfo = {...user} 
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ...
        });
      }
      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
           history.replace(from);
        })
        .catch(error => {
          // Handle Errors here.
          const newUserInfo = {...user} 
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
         });
      }
      e.preventDefault();
    }
 const handleFbSignIn = () => {
  firebase.auth().signInWithPopup(fbProvider)
  .then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log('fbuser', user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
 }
 
    return (
    <div style={{textAlign: 'center'}}>
    {
      user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
      <button onClick={handleSignIn}>Sign In</button>
    }
    <br/>
    <button onClick={handleFbSignIn}>Login Using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>welcome, {user.name}</p>
          <p>your email {user.email}</p>
          <img src={user.photo} alt="photo"/>
        </div>
      }
      <h1>Our own Authentication </h1>
      
      <input type="checkbox" onChange={()=> setNewuser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="your name"/>}
        <br/>
        <input name="email" onBlur={handleBlur} type="text" placeholder="write your email address" required/>
        <br/>
        <input name="password" onBlur={handleBlur} type="password"  placeholder="Your password" required/>
        <br/>
        <input type="submit" value="submit"/>
      </form>
    <p style={{color: 'red'}}> {user.error}</p>
    {
      user.success && <p style={{color: 'green'}}> User {newUser ? 'Created' : 'login'} Successfully</p>
    }
    </div>
  );
}

export default Login;
