import { getApp, getApps, initializeApp } from "firebase/app";
// import firebaseConfig from '../../firebase.config';
import auth from '../../firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then((result) => {
            // console.log(result);
            const { displayName, email, photoURL } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            };
            return signedInUser;
        }).catch((error) => {
            console.log(error);
            console.log(error.message);
        });
}

export const handleSignOut = () => {
    return signOut(auth)
        .then(() => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        }).catch((error) => {
            // An error happened.
        });
}

// export const newUserWithEmailAndPassword = () => {
//     createUserWithEmailAndPassword(auth, user.email, user.password)
//         .then((userCredential) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             updateUserName(user.name);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });
// }

// export const signInUserWithEmailAndPassword = () => {
//     signInWithEmailAndPassword(auth, user.email, user.password)
//         .then((userCredential) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             setLoggedInUser(newUserInfo);
//             history(from, { replace: true });
//             console.log('Signed in user info: ', userCredential.user);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });
// }

// const updateUserName = name => {
//     updateProfile(auth.currentUser, {
//         displayName: name
//     }).then(() => {
//         console.log('username updated successfully');
//     }).catch((error) => {
//         console.log(error);
//     });
// }