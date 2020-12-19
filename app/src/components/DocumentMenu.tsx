import React from 'react';
import { ModelDocumentList } from '../data/types';
import './DocumentMenu.css';

function DocumentMenu(props: {documentList: ModelDocumentList, setDocumentList: (value: ModelDocumentList) => void}) {
  const selectedIndex = props.documentList.selectedDocumentIndex;
  return (
    <div className="DocumentMenu">
      <div className="DocumentMenu-list">
        {props.documentList.documents.map((document, i) => {
          const selectedClass = i === selectedIndex ? 'DocumentMenu-entry-selected ' : '';
          return (
            <div 
              key={i} 
              className={'DocumentMenu-entry ' + selectedClass}
              onClick={() => props.setDocumentList({...props.documentList, selectedDocumentIndex: i})}
            >{document.title}</div>
          );
        })}
      </div>
    </div>
  );
}

export default DocumentMenu;
