import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useState } from 'react';

initializeApp(firebaseConfig);

function Login() {

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  });

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(signedInUser);
      }).catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        setUser(signedOutUser);
        console.log('signed out');
      }).catch((error) => {
        // An error happened.
      });
  }

  const handleSubmit = (e) => {
    if (newUser && (user.email && user.password)) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && (user.email && user.password)) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log('Signed in user info: ', userCredential.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
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

  const updateUserName = name => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('username updated successfully');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div style={{ textAlign: 'center' }}>

      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
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
