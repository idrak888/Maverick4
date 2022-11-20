import React, { useState } from "react";
import "./styles.css";
import Button from 'react-bootstrap/Button';

export default () => {
  const [stringInput, setStringInput] = useState("");
  const [view, setView] = useState("derivative")
  const [output, setOutput] = useState(false);
  const [outputString, setOutputString] = useState("");

  const calculate = () => {
    var final = "";
    if (view == "derivative") {
      var terms = stringInput.split("+");
      for (let i=0;i<terms.length;i++) {
        if (terms[i].includes("^")) {
          var deg = terms[i][terms[i].length - 1]
          final += deg + "x^" + (deg - 1)
        } else if (terms[i].includes("x")) {
          final += " + " + terms[i].replace("x", "");
        }
      }
    }
    setOutputString("F'(x) = " + final);
    setOutput(true);
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
        <div style={{fontSize: 24, margin: 5}}>{outputString}</div>
      </div> : null}
    </div>
  );
}