import './App.scss';
import ChatRoom from './components/ChatRoom'
import SignUp from './components/SignUp'

import 'firebase/auth'
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app } from './firebase';
import { getFirestore } from 'firebase/firestore'


function App() {
  const [user, setUser] = useState(false)
  const auth = getAuth(app);
  const db = getFirestore(app);


  useEffect(() => {

    const listner = onAuthStateChanged(auth, (data) => {
      setUser(data);
    })

    return () => {
      listner();
    }

  }, [db, auth])


  return (
    <div className="inner-container">
      {user ? <ChatRoom auth={auth} db={db} user={user} /> : <SignUp auth={auth} />}
    </div>
  );


}

export default App;



