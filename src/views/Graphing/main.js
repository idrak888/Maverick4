import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import "./styles.css";

export default () => {
  const [output, setOutput] = useState(false);

  return (
    <div className="Graphing">
      <h4>Input</h4>
      <div>
        <textarea className="input-container" placeholder="Input Function F(x) to plot"></textarea> 
        <Button style={{marginTop: 10, marginLeft: 5, width: 150, fontWeight: "bold"}} variant="primary">Run Plotter</Button>
      </div>

      <br/>
      
      {output ? <div>
        <h4>Output</h4>
        <div></div>
      </div> : null}
    </div>
  );
}