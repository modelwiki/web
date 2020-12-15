import React from 'react';
import { ModelDocumentList } from './data/types';
import './SplitScreen.css';

function SplitScreen(props: {documentList: ModelDocumentList, setDocumentList: (value: ModelDocumentList) => void}) {
  const updateDocument = (innerHtml : String) => {
    let i = props.documentList.selectedDocumentIndex;
    if(i != null) {
      let documents = props.documentList.documents.slice();
      documents[i] = {...documents[i], richText: innerHtml};
      props.setDocumentList({...props.documentList, documents: documents});
    }
  };
  return (
    <div className="SplitScreen">
      <div className="SplitScreen-left">
        {props.documentList.documents.map(document =>
          <div>{document.richText}</div>
        )}
      </div>
      <div className="SplitScreen-middle" contentEditable onInput={event => updateDocument(event.currentTarget.innerHTML)}>
      </div>
      <div className="SplitScreen-right">
      </div>
    </div>
  );
}

export default SplitScreen;
