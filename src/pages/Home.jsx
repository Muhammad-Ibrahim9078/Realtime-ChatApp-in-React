import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { auth } from '../config/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Chatting from '../components/chatting';



function Home() {

  const [user, setUser] = useState()
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  return (
    <>
    <div>

      <Chatting />
    </div>
    </>
  );
}

export default Home;
