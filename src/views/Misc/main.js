import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./styles.css";

export default () => {
  const [view, setView] = useState("ellipse");
  const [output, setOutput] = useState(false);

  return (
    <div className="Misc">
      <h4>Input</h4>
      <div>
        <div className="presets">
          <Button active={view == "ellipse"} onClick={() => setView("ellipse")} variant="outline-light">Ellipse Equation</Button>
        </div>
        {view == "ellipse" ?
          <div>
            <textarea style={{height: 100}} className="input-container" placeholder="Raw Ellipse Equation"></textarea> 
            <textarea style={{height: 100}} className="input-container" placeholder="Angle (degrees)"></textarea>
            <Button style={{marginTop: 10, marginLeft: 5, width: 200, fontWeight: "bold"}} variant="primary">Solve for r</Button>
          </div>
        : null}
      </div>

      <br/>
      
      {output ? <div>
        <h4>Output</h4>
        <div></div>
      </div> : null}
    </div>
  );
}