import React from 'react';
import './AppLayout.css';
import AppLayout from './AppLayout';
import firebase from 'firebase';


function User() {
  const [user, updateState] = React.useState<firebase.User|null>(null);

  React.useMemo(() => {
    firebase.auth().onAuthStateChanged(user => updateState(user))
  }, [])

  if (user !== null) {
    return (
        <AppLayout user={user} />
    );
  } else {
    return (
        <div>signing in...</div>
    )
  }
}

export default User;
