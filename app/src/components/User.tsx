import React, { useReducer } from 'react';
import './AppLayout.css';
import AppLayout from './AppLayout';
import firebase from 'firebase';
import { DbId, DbList, DbStore } from '../firebase'
import { ModelDocument } from '../data/types';


function User() {
  const initialDocuments = React.useMemo(() => [
    {title: "Untitled", richText: null, code: "", descriptorCode: "", id: DbId()},
    {title: "Untitled", richText: null, code: "", descriptorCode: "", id: DbId()},
    {title: "Untitled", richText: null, code: "", descriptorCode: "", id: DbId()}
  ], [])

  const [st, updateState] = React.useState<{user: firebase.User|null, initialDocuments: Array<ModelDocument>}>({user: null, initialDocuments});

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => user && DbList(user.uid)
      .then(documents => 
        updateState(_ => { 
          return {user, initialDocuments: documents || initialDocuments}
        }))
      .catch(_ => updateState(s => {return {...s, user}}))
    )
  }, [initialDocuments])


  if (st.user !== null && st.initialDocuments !== null) {
    return (
        <AppLayout user={st.user} initialDocuments={st.initialDocuments} />
    );
  } else {
    return (
        <div>signing in...</div>
    )
  }
}

export default User;
