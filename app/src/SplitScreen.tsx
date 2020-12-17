import React from 'react';
import { ModelDocumentList } from './data/types';
import RichTextEditor from './RichTextEditor';
import './SplitScreen.css';

function SplitScreen(props: {documentList: ModelDocumentList, setDocumentList: (value: ModelDocumentList) => void}) {
  const updateDocument = React.useCallback((richText: any) => {
    let i = props.documentList.selectedDocumentIndex;
    if(i != null) {
      let documents = props.documentList.documents.slice();
      documents[i] = {...documents[i], richText: richText};
      props.setDocumentList({...props.documentList, documents: documents});
    }
  }, [props.setDocumentList]);
  return (
    <div className="SplitScreen">
      <div className="SplitScreen-left">
        {props.documentList.documents.map((document, i) =>
          <div key={i}>{JSON.stringify(document.richText)}</div>
        )}
      </div>
      <div className="SplitScreen-middle">
        <RichTextEditor initialRichText={null} onChange={updateDocument} />
      </div>
      <div className="SplitScreen-right">
      </div>
    </div>
  );
}

export default SplitScreen;
