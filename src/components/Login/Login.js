import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { handleGoogleSignIn, handleSignOut, newUserWithEmailAndPassword, signInUserWithEmailAndPassword } from './LoginManager';

function Login() {

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useNavigate();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((res) => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then((res) => {
        handleResponse(res, false);
      })
  }

  const handleSubmit = (e) => {
    if (newUser && (user.email && user.password)) {
      newUserWithEmailAndPassword(user.name, user.email, user.password)
        .then((res) => {
          handleResponse(res, true);
        })
    }

    if (!newUser && (user.email && user.password)) {
      signInUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history(from, { replace: true });
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }



  return (
    <div style={{ textAlign: 'center' }}>

      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit} action="">
        {
          newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="name" />
        }
        <br />
        <input type="text" onBlur={handleBlur} name="email" placeholder="email" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} Succesfully</p>
      }
    </div>
  );
}

export default Login;
