import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import "./styles.css";

import { compute } from '../../functions/arithmetic';

export default () => {
  const [stringInput, setStringInput] = useState("");
  const [output, setOutput] = useState(false);
  const [outputString, setOutputString] = useState("");

  const calculate = () => {
    setOutputString(compute(stringInput.replace(/\s/g, '')));
    setOutput(true);
  }

  return (
    <div className="Arithmetic">
      <div>
        <h4>Input</h4>
        <div className="presets">
          <Button onClick={() => setStringInput("log(x)")} variant="outline-light">log(x)</Button>
          <Button onClick={() => setStringInput("sqrt(x)")} variant="outline-light">sqrt(x)</Button>
          <Button onClick={() => setStringInput("x!")} variant="outline-light">x!</Button>
          <Button onClick={() => setStringInput("sin(x)")}variant="outline-light">sin(x)</Button>
          <Button onClick={() => setStringInput("cos(x)")} variant="outline-light">cos(x)</Button>
          <Button onClick={() => setStringInput("tan(x)")} variant="outline-light">tan(x)</Button>
          <Button onClick={() => setStringInput("cot(x)")} variant="outline-light">cot(x)</Button>
          <Button onClick={() => setStringInput("sec(x)")} variant="outline-light">sec(x)</Button>
          <Button onClick={() => setStringInput("csc(x)")} variant="outline-light">csc(x)</Button>
        </div>
        <textarea value={stringInput} onChange={e => setStringInput(e.target.value)} className="input-container" placeholder="String Input..."></textarea>
        <Button onClick={calculate} style={{marginTop: 10, marginLeft: 5, width: 150, fontWeight: "bold"}} variant="primary">Run</Button>
      </div>
      
      <br/>
      
      {output ? <div>
        <h4>Output</h4>
        <div style={{fontSize: 24, margin: 5}}>{outputString}</div>
      </div> : null}
    </div>
  );
}