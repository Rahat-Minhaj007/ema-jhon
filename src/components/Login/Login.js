import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false,

  });
  initializeLoginFramework();
  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn ()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }



  

  


  const handleBlur = (event) => {
    // debugger;
    // console.log(event.target.name,event.target.value);
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
      // console.log(isEmailValid);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value)
      isFieldValid = (passwordHasNumber && isPasswordValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email && user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
      })
    

    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email,user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
        })
    }
    e.preventDefault();
  
}

 
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Log In Using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome,{user.name}</p>
          <p>Your Email : {user.email}</p>
          <img src={user.photo} alt="" />


        </div>
      }
      <h1>Our Own Authentication</h1>

      {/* <p>Email : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p> */}
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your Name" required />}
        <br />
        <input onBlur={handleBlur} type="text" name="email" placeholder="Your Email Address" required />
        <br />
        <input onBlur={handleBlur} type="password" name="password" placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />

      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>User  {newUser ? 'Created' : 'Logged In'}  Successfully</p>}

    </div>
  );
}

export default Login;
