import React from 'react';
import "./RichTextEditor.css"

function RichTextViewer(props: {richText: any, code: string, readOnly: boolean, onChangeCode: (code: string) => void}) {

  const [inputValues, setInputValues] = React.useState(new Map<string, number>());

  let formattedValues = new Map<string, any>();
  try {
    const codeFunction = React.useMemo(() => new Function('inputs', props.code), [props.code]);
    const codeOutputs = codeFunction(Object.fromEntries(inputValues));
    formattedValues = new Map([...inputValues, ...Object.entries(codeOutputs ?? {})]);
  } catch(e) {
    console.log(e?.message ?? e);
  }

  const html = props.richText.doc.content.map((block: any, blockIndex: number) => {

    const content = block.content?.map((span: any, spanIndex: number) => {
      if(span.marks?.[0]?.type === 'input') {
        const formatted = formattedValues.get(span.text) ?? "?";
        return <span className="mw-input" key={spanIndex} onClick={_ => {
          setInputValues(new Map([...inputValues, [span.text, parseFloat(Math.random().toFixed(2))]]))
        }}>{"" + formatted}</span>;
      } else if(span.marks?.[0]?.type === 'output') {
        const formatted = formattedValues.get(span.text) ?? "?";
        return <span className="mw-output" key={spanIndex}>{"" + formatted}</span>;
      } else {
        return <span key={spanIndex}>{span.text}</span>;
      }
    }) ?? [];

    return block.type === 'title' ? <h1 key={blockIndex}>{content}</h1> : <p key={blockIndex}>{content}</p>;

  });

  return (
    <div style={{height: "100%"}} className="RichTextEditor">
      <div style={{height: "100%"}}>
        {html}
        <textarea readOnly={props.readOnly} value={props.code} onChange={e => props.onChangeCode(e.target.value)} style={{marginTop: "100px"}} />
      </div>
    </div>
  );

}

export default RichTextViewer;
