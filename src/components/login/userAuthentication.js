// import React, { useState } from 'react';
// import Login from './Login'; // Import the Login component
// import { auth } from '../../firebase';
// import { useHistory } from 'react-router-dom'; // For navigation to Home page

// const UserAuthentication = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const history = useHistory(); // For navigation to Home page

//   const handleAuthentication = (userData) => {
//     const { email, password } = userData;
//     console.log('Email:', email, 'Password:', password);

//     if (isSignUp) {
//       // Sign up user
//       auth
//         .createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//           console.log('User Signed Up:', userCredential.user);
//           history.push('/home'); // Redirect to home page on successful sign up
//         })
//         .catch((error) => {
//           console.error('Error:', error.message);
//         });
//     } else {
//       // Login user
//       auth
//         .signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//           console.log('User Signed In:', userCredential.user);
//           history.push('/home'); // Redirect to home page on successful login
//         })
//         .catch((error) => {
//           console.error('Error:', error.message);
//         });
//     }
//   };

//   return (
//     <div>
//       <Login 
//         handleAuthentication={handleAuthentication} 
//         isSignUp={isSignUp} 
//         setIsSignUp={setIsSignUp} // Pass setIsSignUp here
//       />
//     </div>
//   );
// };

// export default UserAuthentication;
