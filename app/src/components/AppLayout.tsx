import React from 'react';
import './AppLayout.css';
import { ModelDocument, ModelDocumentList } from '../data/types';
import firebase from 'firebase';
import { DbStore } from '../firebase'
import SplitScreen from './SplitScreen';
import { Link } from "react-router-dom";

function AppLayout(props: {user: firebase.User, initialDocuments: Array<ModelDocument>}) {
  
  const [documentList, updateState] = React.useState<ModelDocumentList>(() => {return {selectedDocumentIndex:0, documents: props.initialDocuments}});

  React.useEffect(() => {
    if (documentList.selectedDocumentIndex !== null) {
      const document = documentList.documents[documentList.selectedDocumentIndex]
      console.log(`Storing document ${document.id}`)
      DbStore(props.user.uid, document)
    }
  }, [props.user.uid, documentList])
  
  if (documentList !== null) { 
    return (
      <div className="AppLayout">
        <div className="AppLayout-top">
          <Link to={{ pathname: `/user/${props.user.uid}/model/${documentList.documents[documentList.selectedDocumentIndex || 0].id}` }}>model link</Link>
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
