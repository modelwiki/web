import React from 'react';
import {keymap} from "prosemirror-keymap"
import {history, undo, redo} from "prosemirror-history"
import {DOMParser} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {baseKeymap} from "prosemirror-commands"
import modelKeymap from "./prosemirror/keymap"
import modelSchema from "./prosemirror/schema"
import "./RichTextEditor.css"

const historyKeymap = keymap({"Mod-z": undo, "Mod-Shift-z": redo, "Mod-y": redo})

function initializeProseMirror(place: Node, content: Node) {
  const doc = DOMParser.fromSchema(modelSchema).parse(content)
  return new EditorView(place, {
    state: EditorState.create({
      doc,
      plugins: [modelKeymap, historyKeymap, keymap(baseKeymap), history()]
    })
  })
}

function RichTextEditor(props: {}) {
  const editorElement = React.useRef<HTMLDivElement>(null);
  const contentElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const editor = editorElement.current;
    const content = contentElement.current;
    if(editor != null && content != null) {
      let editorView = initializeProseMirror(editor, content);
      return () => editorView.destroy()
    }
  }, [editorElement.current, contentElement.current]);
  return (
    <div style={{height: "100%"}} className="RichTextEditor">
      <div ref={contentElement}></div>
      <div ref={editorElement} style={{height: "100%"}}></div>
    </div>
  );
}

export default RichTextEditor;
