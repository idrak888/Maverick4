import React, { useState } from "react";
import "./styles.css";
import Button from 'react-bootstrap/Button';

export default () => {
  const [stringInput, setStringInput] = useState("");
  const [output, setOutput] = useState(false);
  const [outputString, setOutputString] = useState("");

  const logBase = (n, base) => Math.log(n) / Math.log(base);

  const calculate = () => {
    if (stringInput.includes("sum")) {
      var arr = stringInput.split("(");
      var limit = arr[1].replace(")", "");
      var index = arr[2].replace(")", "");
      var x = arr[3].replace(")", "");
      var sum = 0;
      for (let i=index;i<=limit;i++) {
        sum += parseInt(x);
      }
      setOutput(true);
      setOutputString(sum);
    }
    if (stringInput.includes("prod")) {
      var arr = stringInput.split("(");
      var limit = arr[1].replace(")", "");
      var index = arr[2].replace(")", "");
      var x = arr[3].replace(")", "");
      var sum = 0;
      for (let i=index;i<=limit;i++) {
        sum *= parseInt(x);
      }
      setOutput(true);
      setOutputString(sum);
    }
    if (stringInput.includes("log_")) {
      var arr = stringInput.split("(");
      var num = parseFloat(arr[1].replace(")", ""));
      var base = parseFloat(stringInput.split("_")[1].split("(")[0]);
      
      var ans = logBase(num, base);

      setOutput(true);
      setOutputString(ans.toFixed(2));
    }
    
  }

  return (
    <div className="MultiParam">
      <h4>Input</h4>
      <div>
        <div className="presets">
          <Button onClick={() => setStringInput("log_x(y)")} variant="outline-light">Logarithm base x</Button>
          <Button onClick={() => setStringInput("sum(limit)(index)(x)")} variant="outline-light">Summation</Button>
          <Button onClick={() => setStringInput("prod(limit)(index)(x)")} variant="outline-light">Product</Button>
          <Button onClick={() => setStringInput("ax^2 + bx + c")} variant="outline-light">Polynomial</Button>
        </div>
        <div>
          <textarea value={stringInput} onChange={e => setStringInput(e.target.value)} className="input-container" placeholder="Input String..."></textarea> 
          <Button onClick={calculate} style={{marginTop: 10, marginLeft: 5, width: 150, fontWeight: "bold"}} variant="primary">Run</Button>
        </div>
      </div>

      <br/>
      
      {output ? <div>
        <h4>Output</h4>
        <div style={{fontSize: 24, margin: 5}}>{outputString}</div>
      </div> : null}
    </div>
  );
}