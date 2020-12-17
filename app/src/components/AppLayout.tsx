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
  const setDocumentListCallback = React.useCallback(v => setDocumentList(v), []);
  return (
    <div className="AppLayout">
      <div className="AppLayout-top">
      </div>
      <div className="AppLayout-middle">
        <SplitScreen documentList={documentList} setDocumentList={setDocumentListCallback} />
      </div>
    </div>
  );
}

export default AppLayout;
