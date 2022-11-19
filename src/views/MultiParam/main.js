import React, { useState } from "react";
import "./styles.css";
import Button from 'react-bootstrap/Button';

export default () => {
  const [stringInput, setStringInput] = useState("");
  const [output, setOutput] = useState(false);

  const calculate = () => {
    
  }

  return (
    <div className="MultiParam">
      <h4>Input</h4>
      <div>
        <div className="presets">
          <Button onClick={() => setStringInput("ax^2 + bx + c")} variant="outline-light">Polynomial</Button>
          <Button onClick={() => setStringInput("log_x(y)")} variant="outline-light">Logarithm base x</Button>
          <Button onClick={() => setStringInput("rt^(y)(x)")} variant="outline-light">X’th root</Button>
          <Button onClick={() => setStringInput("sum(limit)(index)(x)")} variant="outline-light">Summation</Button>
          <Button onClick={() => setStringInput("prod(limit)(index)(x)")} variant="outline-light">Product</Button>
        </div>
        <div>
          <textarea value={stringInput} onChange={e => setStringInput(e.target.value)} className="input-container" placeholder="Input String..."></textarea> 
          <Button onClick={calculate} style={{marginTop: 10, marginLeft: 5, width: 150, fontWeight: "bold"}} variant="primary">Run</Button>
        </div>
      </div>

      <br/>
      
      {output ? <div>
        <h4>Output</h4>
        <div></div>
      </div> : null}
    </div>
  );
}