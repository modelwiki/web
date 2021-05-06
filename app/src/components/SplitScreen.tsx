import React from 'react';
import { ModelDocumentList } from '../data/types';
import DocumentMenu from './DocumentMenu';
import RichTextEditor from './RichTextEditor';
import RichTextViewer from './RichTextViewer';
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

  const updateCode = (code: string) => {
    const i = props.documentList.selectedDocumentIndex;
    if(i != null) {
      const documents = props.documentList.documents.slice();
      documents[i] = {...documents[i], code: code};
      props.setDocumentList({...props.documentList, documents: documents});
    }
  };

  const updateDescriptorCode = (code: string) => {
    const i = props.documentList.selectedDocumentIndex;
    if(i != null) {
      const documents = props.documentList.documents.slice();
      documents[i] = {...documents[i], descriptorCode: code};
      props.setDocumentList({...props.documentList, documents: documents});
    }
  };

  const code =
    props.documentList.selectedDocumentIndex == null ? "" : 
    props.documentList.documents[props.documentList.selectedDocumentIndex].code;

  const descriptorCode =
    props.documentList.selectedDocumentIndex == null ? "" : 
    props.documentList.documents[props.documentList.selectedDocumentIndex].descriptorCode;

  const [editing, setEditing] = React.useState(true);

  return (
    <div className="SplitScreen">
      <div className="SplitScreen-left">
        <DocumentMenu documentList={props.documentList} setDocumentList={props.setDocumentList} />
      </div>
      <div className="SplitScreen-middle">{editing
        ? <RichTextEditor selectedIndex={props.documentList.selectedDocumentIndex} initialRichText={initialRichText} onChange={updateDocument} />
        : <RichTextViewer readOnly={false} richText={initialRichText} code={code} showCode={true} descriptorCode={descriptorCode} showDescriptorCode={true} onChangeCode={updateCode} onChangeDescriptorCode={updateDescriptorCode} />
      }</div>
      <div className="SplitScreen-right">
        <div style={{padding: "100px"}}>
          <div><label><input type="radio" checked={editing} onChange={_ => setEditing(true)} /> Edit document</label></div>
          <div><label><input type="radio" checked={!editing} onChange={_ => setEditing(false)} /> Edit code and values</label></div>
        </div>
      </div>
    </div>
  );
}

export default SplitScreen;
