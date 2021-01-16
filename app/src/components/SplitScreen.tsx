import React from 'react';
import { ModelDocumentList } from '../data/types';
import DocumentMenu from './DocumentMenu';
import RichTextEditor from './RichTextEditor';
import './SplitScreen.css';

function SplitScreen(props: {documentList: ModelDocumentList, setDocumentList: (value: ModelDocumentList) => void}) {
  const updateDocument = (richText: any) => {
    const i = props.documentList.selectedDocumentIndex;
    if(i != null) {
      const title = richText.doc?.content?.[0]?.content?.[0]?.text || "Untitled";
      const documents = props.documentList.documents.slice();
      documents[i] = {...documents[i], title: title, richText: richText};
      props.setDocumentList({...props.documentList, documents: documents});
    }
  };

  const initialRichText = React.useMemo(() => 
    props.documentList.selectedDocumentIndex == null ? null : 
    props.documentList.documents[props.documentList.selectedDocumentIndex].richText
  , [props.documentList]);

  return (
    <div className="SplitScreen">
      <div className="SplitScreen-left">
        <DocumentMenu documentList={props.documentList} setDocumentList={props.setDocumentList} />
      </div>
      <div className="SplitScreen-middle">
        <RichTextEditor selectedIndex={props.documentList.selectedDocumentIndex} initialRichText={initialRichText} onChange={updateDocument} />
      </div>
      <div className="SplitScreen-right">
      </div>
    </div>
  );
}

export default SplitScreen;
