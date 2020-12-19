import React from 'react';
import './AppLayout.css';
import { ModelDocumentList } from '../data/types';
import SplitScreen from './SplitScreen';

function AppLayout() {
  const initialDocuments = [
    {title: "Untitled", richText: null, code: ""}, 
    {title: "Untitled", richText: null, code: ""}, 
    {title: "Untitled", richText: null, code: ""}
  ];
  const [documentList, setDocumentList] = React.useState<ModelDocumentList>({selectedDocumentIndex: 0, documents: initialDocuments});
  return (
    <div className="AppLayout">
      <div className="AppLayout-top">
      </div>
      <div className="AppLayout-middle">
        <SplitScreen documentList={documentList} setDocumentList={v => setDocumentList(v)} />
      </div>
    </div>
  );
}

export default AppLayout;
