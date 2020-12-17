import React from 'react';
import { ModelDocumentList } from '../data/types';
import RichTextEditor from './RichTextEditor';
import './SplitScreen.css';

function SplitScreen(props: {documentList: ModelDocumentList, setDocumentList: (value: ModelDocumentList) => void}) {
  const updateDocument = React.useCallback((richText: any) => {
    const i = props.documentList.selectedDocumentIndex;
    if(i != null) {
      const title = richText.doc?.content?.[0]?.content?.[0]?.text || "Untitled";
      const documents = props.documentList.documents.slice();
      documents[i] = {...documents[i], title: title, richText: richText};
      props.setDocumentList({...props.documentList, documents: documents});
    }
  }, [props.setDocumentList]);
  const initialRichText = React.useMemo(() => 
    props.documentList.selectedDocumentIndex == null ? null : 
    props.documentList.documents[props.documentList.selectedDocumentIndex].richText
  , [props.documentList.selectedDocumentIndex]);
  return (
    <div className="SplitScreen">
      <div className="SplitScreen-left">
        {props.documentList.documents.map((document, i) =>
          <div key={i}>{document.title}</div>
        )}
      </div>
      <div className="SplitScreen-middle">
        <RichTextEditor initialRichText={initialRichText} onChange={updateDocument} />
      </div>
      <div className="SplitScreen-right">
      </div>
    </div>
  );
}

export default SplitScreen;
