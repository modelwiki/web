import React from 'react';
import {Descriptor} from "../data/types"

function InputVariable(props: {value: number, text: string, descriptor: Descriptor, onChange: (value: number) => void}) {

  const [sliding, setSliding] = React.useState<null | {initialValue: number, initialX: number}>(null);

  function onMouseDown(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if(event.buttons !== 1) return;
    event.preventDefault();
    setSliding({initialValue: props.value, initialX: event.pageX});
  }

  function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if(event.buttons !== 1 || sliding === null) {
        setSliding(null);
    } else {
        function newValue(initialX: number, initialValue: number, scale: number): number {
          const steps = (event.pageX - initialX) * scale
          const val = initialValue + props.descriptor.step * steps
          return Math.max(props.descriptor.min, Math.min(val, props.descriptor.max))
        }
        if (Math.abs(sliding.initialX - event.pageX) < 10) {
          props.onChange(newValue(sliding.initialX, sliding.initialValue, 1))
        } else {
          const range = (props.descriptor.max - props.descriptor.min) / props.descriptor.step + 1
          const scale = range / 200
          const scaledValue = newValue(sliding.initialX, sliding.initialValue, scale)
          props.onChange(scaledValue);
        }
    }
  }

  React.useEffect(() => {
    if(sliding) {
        document.addEventListener("mousemove", onMouseMove);
        document.body.style.cursor = 'ew-resize';
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.body.style.cursor = '';
        }
    }
  });

  return (
    <span className="mw-input" onMouseDown={onMouseDown}>{props.text}</span>
  );

}

export default InputVariable;
