import React,{useState,useContext,useEffect} from 'react';
import {FirebaseContext} from '../../store/Context';

import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase} = useContext(FirebaseContext)
  const navigate=useNavigate()



  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If the user is already logged in, navigate to the home page
        navigate('/');
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [firebase, navigate]);


 
const handleLogin = (e) => {
  e.preventDefault();
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      navigate('/', { replace: true }); // Use replace to navigate
    })
    .catch((error) => {
      alert(error.message); // Corrected 'massage' to 'message'
    });
};

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;


// import React, { useState, useContext } from 'react';
// import { FirebaseContext } from '../../store/Context'
// import Logo from '../../olx-logo.png';
// import './Login.css';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';



// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('')
//   const [emailError,setEmailError] = useState('');
//   const [passwordError,setPasswordError] = useState('')

//   const { firebase } = useContext(FirebaseContext);
//   const navigate = useNavigate('')


//   const handleSignup = () => {
//     navigate('/signup');
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault()



//     setEmailError('');
//     setPasswordError('');


//     if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       setEmailError('Please enter a valid email address.');
//       return;
//     }

//     if (!password || password.length < 6) {
//       setPasswordError('Password must be at least 6 characters long.');
//       return;
//     }

//     const auth = getAuth(firebase);
//     const userCredential = await signInWithEmailAndPassword(auth, email, password)   
//       .then((userCredential) => {

//         const user = userCredential.user;
//         navigate('/')
        

//       }).catch((error) => {
//         alert("failed");
//       });
//   }


//   return (
//     <div>
//       <div className="loginParentDiv">
//       <img width="200px" height="200px" src={Logo} alt=''></img>
//         <form onSubmit={handleLogin}>
//           <label htmlFor="fname">Email</label>
//           <br />
//           <input
//             className="input"
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//           {emailError && <span className="error">{emailError}</span>}
//           <br />
//           <label htmlFor="lname">Password</label>
//           <br />
//           <input
//             className="input"
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//            {passwordError && <span className="error">{passwordError}</span>}
//           <br />
//           <br />
//           <button>Login</button>
//         </form>
//         <a onClick={handleSignup} >Signup</a>
//       </div>
//     </div>
//   );
// }

// export default Login;
