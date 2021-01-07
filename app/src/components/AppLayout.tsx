import React from 'react';
import './AppLayout.css';
import { ModelDocumentList } from '../data/types';
import firebase from 'firebase';
import { DbId, DbList, DbStore } from '../firebase'
import SplitScreen from './SplitScreen';
import { useAsync } from 'react-async';


function AppLayout(props: {user: firebase.User}) {
  const initialDocuments = [
    {title: "Untitled", richText: null, code: "", id: DbId()},
    {title: "Untitled", richText: null, code: "", id: DbId()},
    {title: "Untitled", richText: null, code: "", id: DbId()}
  ]
  
  const [documentList, updateState] = React.useState<ModelDocumentList|null>(null);

  if (documentList === null) {
    DbList(props.user.uid).then((list) => updateState({selectedDocumentIndex: 0, documents: list && list.length ? list : initialDocuments}))
  }

  if (documentList !== null && documentList.selectedDocumentIndex !== null) {
    const document = documentList.documents[documentList.selectedDocumentIndex]
    console.log(`Storing document ${document.id}`)
    DbStore(props.user.uid, document)
  }
  
  if (documentList !== null) { 
    return (
      <div className="AppLayout">
        <div className="AppLayout-top">
        </div>
        <div className="AppLayout-middle">
          <SplitScreen documentList={documentList} setDocumentList={v => updateState(v)} />
        </div>
      </div>
    );
  } else {
    return (
      <div>loading...</div>
    )
  }
}

export default AppLayout;
