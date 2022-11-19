import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

export default () => {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [showGrid, setShowGrid] = useState(false);

  return (
    <div className="Matrix">
      <h4>Enter Dimensions for <i>Matrix 1</i></h4>
      <div className="dimensions"><input value={rows} type={"number"} onChange={e => setRows(e.target.value)} placeholder="Rows"/> x <input value={columns} type={"number"} onChange={e => setColumns(e.target.value)} placeholder="Columns"/></div>
      {
        rows != "" && columns != "" && rows > 0 && columns > 0 ? 
        <div>
          <h4>Enter values for <i>Matrix 1</i></h4>
          
        </div>
        : null
      }
    </div>
  );
}