import React from 'react';
import './AppLayout.css';
import { DbList } from '../firebase'
import { ModelDocument } from '../data/types';
import { useParams } from "react-router";
import RichTextViewer from './RichTextViewer';


function ViewModel() {
  let { user, model } = useParams<{user: string, model: string}>();
  console.log(`${user} ${model}`)

  const initialDocuments = React.useMemo(() => [], [])

  const [st, updateState] = React.useState<{user: string|null, initialDocuments: Array<ModelDocument>}>({user, initialDocuments});

  React.useEffect(() => {
    DbList(user)
      .then(documents => 
        updateState(_ => { 
          return {user, initialDocuments: documents.filter(d => d.id === model)}
        }))
      .catch(_ => updateState(s => {return {...s, user}}))
  }, [user, model])

  const initialRichText = React.useMemo(() => 
    st.initialDocuments.length === 0 ? null : 
    st.initialDocuments[0].richText
  , [st.initialDocuments]);

  const code = React.useMemo(() => 
    st.initialDocuments.length === 0 ? "" : 
    st.initialDocuments[0].code
  , [st.initialDocuments]);

  if (st.user !== null && st.initialDocuments.length !== 0) {
    return (
        <div className="AppLayout">
            <div className="AppLayout-top">
            </div>
            <div className="AppLayout-middle">
                <RichTextViewer readOnly={true} richText={initialRichText} code={code} onChangeCode={() => {}} />
            </div>
        </div>
    );
  } else {
    return (
        <div>loading...</div>
    )
  }
}

export default ViewModel;
