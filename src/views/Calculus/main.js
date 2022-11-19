import React, { useState } from "react";
import "./styles.css";
import Button from 'react-bootstrap/Button';

export default () => {
  const [stringInput, setStringInput] = useState("");
  const [view, setView] = useState("derivative")
  const [output, setOutput] = useState(false);
  const [outputString, setOutputString] = useState("");


  return (
    <div className="Calculus">
      <h4>Input</h4>
      <div>
        <div className="presets">
          <Button active={view == "derivative"} onClick={() => setView("derivative")} variant="outline-light">Derivative Calculator</Button>
          <Button active={view == "integral"} onClick={() => setView("integral")} variant="outline-light">Integral Calculator</Button>
        </div>
        <div>
          <textarea className="input-container" value={stringInput} onChange={e => setStringInput(e.target.value)} placeholder="Input Function F(x)"></textarea> 
        </div>
        <Button onClick={() => {}} style={{marginTop: 10, marginLeft: 5, width: 150, fontWeight: "bold"}} variant="primary">{view == "derivative" ? "Differentiate" : "Integrate"}</Button>
      </div>

      <br/>
      
      {output ? <div>
        <h4>Output</h4>
        <div>{outputString}</div>
      </div> : null}
    </div>
  );
}