import React from 'react';
import './AppLayout.css';
import { ModelDocumentList } from './data/types';
import SplitScreen from './SplitScreen';

function AppLayout() {
  let [documentList, setDocumentList] = React.useState<ModelDocumentList>({selectedDocumentIndex: 0, documents: [{richText: "", code: ""}]});
  console.log(documentList);
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
