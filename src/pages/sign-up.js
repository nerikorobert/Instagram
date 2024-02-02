/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [ username, setUserName ] = useState('');
    const [ fullname, setFullName ] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async(event) => {
      event.preventDefault();

    const usernameExist = await doesUsernameExist(username);
    // console.log('usernameExist', usernameExist);
    if (!usernameExist.length) {
      try {
        const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);

        //authentication
        // => emailAddress and password and username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username

        });
        // firebase user collection (create a document)
        await firebase.firestore().collection('users').add({
          userId:createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now()
        });
        navigate(ROUTES.DASHBOARD);
        
      } catch(error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError('');
      }
    } else {
      setError('That username is already taken, please try another');
    }
   

    };

    useEffect(() => {
        document.title = 'Sign Up - Instagram';
    }, []);



return (
    <div className={'container flex mx-auto max-w-screen-md items-center h-screen'}>
     <div className="flex w-3/5">
        <img src="https://miro.medium.com/v2/resize:fit:380/1*p3enPap7mtfLpLNlWV_dGQ.jpeg"
         alt="iPhone with Instagram app" />
            

     </div>
     <div className="flex flex-col w-2/5">
        <div className="flex dlex-col">
        <h1 className="flex justify-center w-full">
        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
        </h1>
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

        <form onSubmit={handleSignUp} method="POST">
        <input
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setUserName(target.value)}
                value={username} 

                />
            <input
                aria-label="Enter your full name"
                type="text"
                placeholder="Full Name"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setFullName(target.value)}
                value={fullname}
                />
                <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
              />
                 <input
                aria-label="Enter your password"
                type="password"
                placeholder="password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPassword(target.value)} 
                value={password}

                />
               <button
  disabled={isInvalid}
  type="submit"
  className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
    isInvalid ? 'opacity-50' : ''
  }`}
>
  Sign up
</button>
</form>
</div>
<div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
<p className="text-sm">Have an account?{``}
<Link to= {ROUTES.LOGIN} className="font-bold text-blue-medium">
    Log in
  </Link>
</p>
  
</div>
</div>
</div>
);
}
