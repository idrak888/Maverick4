import React, { useState } from "react";
import "./styles.css";
import Button from 'react-bootstrap/Button';

export default () => {
  const [stringInput, setStringInput] = useState("");
  const [view, setView] = useState("derivative")
  const [output, setOutput] = useState(false);
  const [outputString, setOutputString] = useState("");

  const calculate = () => {
    if (view == "derivative") {
      var eqn = stringInput;
      for (let i=0;i<eqn.length;i++) {
        if (eqn[i] == "x") {
          if (eqn[i + 1] == "^") {
            var power = parseInt(eqn[i + 2]);
            eqn = eqn.substring(0, i - 1) + parseInt(i) * power + eqn.substring(i + "".length);
          } else {
            eqn = eqn.substring(0, i) + "" + eqn.substring(i + "".length);
          }
        }
      }
      console.log(eqn);
    }
  }  

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
        <Button onClick={calculate} style={{marginTop: 10, marginLeft: 5, width: 150, fontWeight: "bold"}} variant="primary">{view == "derivative" ? "Differentiate" : "Integrate"}</Button>
      </div>

      <br/>
      
      {output ? <div>
        <h4>Output</h4>
        <div>{outputString}</div>
      </div> : null}
    </div>
  );
}