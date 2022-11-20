import React, { useState, useEffect } from "react";

function GridGenerator(props) {
  const [row, setRow] = useState(props.row);
  const [col, setCol] = useState(props.cols);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  useEffect(() => {
    rows.length = 0;
    cols.length = 0;
    for (let i = 0; i < row; i++) {
      rows.push(i);
    }
    for (let j = 0; j < col; j++) {
      cols.push(j);
    }
    setRows((t) => [...rows]);
    setCols((t) => [...cols]);
  }, []);

  return (
    <div>
      {rows.length !== 0 ? (
        <table border="1" align="center">
          <tbody>
            {rows.map((i) => {
              return (
                <tr
                  key={"tr" + i}
                  style={{ color: i % 2 !== 0 ? "blue" : "black" }}
                >
                  {cols.map((j) => {
                    return (
                      <td key={i + "td" + j}>
                        {i},{j}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default GridGenerator;