import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({
    uid: '',
    displayName: '',
    // Add other default properties as needed
  });
  const { user } = useContext(UserContext);

  useEffect(() => { 
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid)
      setActiveUser(response)
    }
    

    if (user?.uid) {
      getUserObjByUserId();
    } 
  }, [user]);

  // console.log('activeUser', activeUser);

  return { user:activeUser };
}
