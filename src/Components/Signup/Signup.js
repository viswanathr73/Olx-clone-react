


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import Firebase Authentication functions
import { getFirestore, collection, addDoc } from 'firebase/firestore';


export default function Signup() {

  //  const history = useHistory();
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('')

  const { firebase } = useContext(FirebaseContext);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const auth = getAuth(firebase); // Obtain the authentication instance
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((result) => {
  //       result.user.updateProfile({ displayName: username });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let isValid = true;

    if (!/^[a-zA-Z]*$/.test(username)) {
      setUsernameError('Username should contain letters only');
      isValid = false;
    } else {
      setUsernameError('');
    }


    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }


    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone number should contain 10 digits');
      isValid = false;
    } else {
      setPhoneError('');
    }



    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }




    const auth = getAuth(firebase); // Obtain the authentication instance

    if (isValid) {
      try {
        // Create the user using Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set the user's display name during user creation
        await updateProfile(user, {
          displayName: username
        });

        // Add the user data to the Firestore database
        const db = getFirestore(firebase);
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          username,
          email,
          phone,
        }).then(() => {
          navigate("/login")
        })

        console.log('User registered successfully and added to Firestore.');
      } catch (error) {
        console.error('Error registering user:', error.message);
      }
    }
  };


  const handleUsernameChange = (value) => {
    setUsername(value);
    if (usernameError && /^[a-zA-Z]*$/.test(value)) {
      setUsernameError('');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (emailError && /\S+@\S+\.\S+/.test(value)) {
      setEmailError('');
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (phoneError && /^\d{10}$/.test(value)) {
      setPhoneError('');
    }
  };


  const handlePasswordChange = (value) => {
    setPassword(value);
    if (passwordError && value.length >= 6) {
      setPasswordError('');
    }
  };



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className={`input ${usernameError ? 'error' : ''}`}
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            id="username"
            name="name"
          />
          <p className="error-message">{usernameError}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className={`input ${emailError ? 'error' : ''}`}
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            id="email"
            name="email"

          />
          <p className="error-message">{emailError}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className={`input ${phoneError ? 'error' : ''}`}
            type="number"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            id="phone"
            name="phone"
          />
            <p className="error-message">{phoneError}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className={`input ${passwordError ? 'error' : ''}`}
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            id="password"
            name="password"
          />
           <p className="error-message">{passwordError}</p>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}
