import { format } from 'path';
import React from 'react';
import "./RichTextEditor.css"
import {Descriptor} from "../data/types"
import InputVariable from "./InputVariable"

function RichTextViewer(props: {
  richText: any, 
  code: string, 
  descriptorCode: string, 
  readOnly: boolean,
  showCode: boolean,
  showDescriptorCode: boolean,
  onChangeCode: (code: string) => void,
  onChangeDescriptorCode: (code: string) => void,
}) {

  const [state, setState] = React.useState({inputValues: new Map<string, number>(), showCode: props.showCode, showDescriptorCode: props.showDescriptorCode});

  function setInputValues(values: Map<string, number>) {
    setState((st) => {return {...st, inputValues: values}})
  }

  function toggleShowCode() {
    setState((st) => {return {...st, showCode: !state.showCode}})
  }

  function toggleShowCodeDescriptor() {
    setState((st) => {return {...st, showDescriptorCode: !state.showDescriptorCode}})
  }

  let descriptors = new Map<string, Descriptor>();
  try {
    const codeFunction = React.useMemo(() => new Function(props.descriptorCode), [props.descriptorCode]);
    const codeOutputs = codeFunction();
    const entries = Object.entries(codeOutputs ?? {});
    function process(pair: [string, any]): [string, Descriptor] {
      const [variable, descriptor] = pair;
      return [variable, processDescriptor(descriptor)];
    }
    descriptors = new Map([...entries.map(process)]);
  } catch(e) {
    console.log(e?.message ?? e);
  }

  let outputValues = new Map<string, any>();
  try {
    const codeFunction = React.useMemo(() => new Function('inputs', props.code), [props.code]);
    function process(pair: [string, Descriptor]): [string, number] {
      const [variable, descriptor] = pair;
      return [variable, descriptor.defaultValue];
    }
    const defaults = Object.entries({...Object.fromEntries(descriptors)}).map(process);
    const codeOutputs = codeFunction({...Object.fromEntries(defaults), ...Object.fromEntries(state.inputValues)});
    outputValues = new Map([...Object.entries(codeOutputs ?? {})]) as Map<string, any>;
  } catch(e) {
    console.log(e?.message ?? e);
  }

  const html = props.richText.doc.content.map((block: any, blockIndex: number) => {

    const content = block.content?.map((span: any, spanIndex: number) => {
      if(span.marks?.[0]?.type === 'input') {
        const descriptor = descriptors.get(span.text) ?? processDescriptor({});
        const value = state.inputValues.get(span.text) ?? descriptor.defaultValue;
        const text = formatValue(value, descriptor);
        return <span key={spanIndex}>
          <InputVariable 
            value={value} 
            text={text} 
            descriptor={descriptor} 
            onChange={newValue => setInputValues(new Map([...state.inputValues, [span.text, newValue]]))} />
        </span>;
      } else if(span.marks?.[0]?.type === 'output') {
        const descriptor = descriptors.get(span.text) ?? processDescriptor({});
        const value = outputValues.get(span.text) ?? descriptor.defaultValue;
        const text = formatValue(value, descriptor);
        return <span className="mw-output" key={spanIndex}>{"" + text}</span>;
      } else {
        let wrapper = span.text;
        span.marks?.forEach((mark: { type: string; attrs: any; }) => {
          wrapper = 
            mark?.type == 'bold' ? <b>{wrapper}</b> :
            mark?.type == 'italic' ? <i>{wrapper}</i> :
            mark?.type == 'link' ? <a href={mark?.attrs.href} target="_blank" rel="noopener">{wrapper}</a> :
            wrapper;
        });
        return <span key={spanIndex}>{wrapper}</span>;
      }
    }) ?? [];
    return (
      block.type === 'title' ? <h1 key={blockIndex}>{content}</h1> : 
      content.length == 0 ? <p key={blockIndex}><br /></p> :
      <p key={blockIndex}>{content}</p>
    );

  });

  const showHideCode = <p onClick={() => toggleShowCode()}><b>{state.showCode ? "Hide code" : "Show code"}</b></p>
  const showHideCodeDescriptor = <p onClick={() => toggleShowCodeDescriptor()}><b>{state.showDescriptorCode ? "Hide descriptor" : "Show descriptor"}</b></p>

  return (
    <div style={{marginLeft: "50px", height: "100%"}} className="RichTextEditor">
      <div style={{height: "100%", marginBottom: "50px"}}>
        {html}
        <div style={{marginTop: "50px"}}>
        {showHideCode}
        <textarea 
          readOnly={props.readOnly} 
          value={props.code} 
          onChange={e => props.onChangeCode(e.target.value)} 
          style={{marginTop: "0px", width: "90%", height: "150px", fontWeight: "bold", display: state.showCode ? "block" : "none"}} />
        {showHideCodeDescriptor}
        <textarea 
          readOnly={props.readOnly} 
          value={props.descriptorCode} 
          onChange={e => props.onChangeDescriptorCode(e.target.value)} 
          style={{marginTop: "0px", width: "90%", height: "150px", fontWeight: "bold", display: state.showDescriptorCode ? "block" : "none"}} />
       </div>
      </div>
    </div>
  );

}

function processDescriptor(o: any): Descriptor {
  const defaultValue = o.defaultValue ?? 0;
  const min = o.min ?? 0;
  const max = o.max ?? 100;
  const step = o.step ?? parseFloat(((max - min) / 200).toFixed(1));
  const prefix = o.prefix ?? '';
  const suffix = o.suffix ?? '';
  const thousands = o.thousands || 'comma';
  return {defaultValue, min, max, step, prefix, suffix, thousands};
}

function formatValue(value: any, descriptor: Descriptor): string {
  const prefix = descriptor.prefix ?? '';
  const suffix = descriptor.suffix ?? '';

  if (typeof(value) === "number") {
    value -= value % descriptor.step
    return prefix + parseFloat(value.toFixed(6)) + suffix;
  }
  return prefix + value + suffix;
}

export default RichTextViewer;
