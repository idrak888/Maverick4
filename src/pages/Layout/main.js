import React, { Component } from "react";
import "./styles.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Arithmetic from "../../views/Arithmetic/main";
import MultiParam from "../../views/MultiParam/main";
import Calculus from "../../views/Calculus/main";
import Misc from "../../views/Misc/main";
import Graphing from "../../views/Graphing/main";
import Matrix from "../../views/Matrix/main";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Navbar style={{backgroundColor: "#0F2151"}} variant="dark">
            <Container>
                <Navbar.Brand href="/">Maverick4</Navbar.Brand>
            </Container>
        </Navbar>
        <div className="Layout">
          <Container>
            <Tabs defaultActiveKey="arithmetic" className="mb-3">
              <Tab tabClassName="tab" eventKey="arithmetic" title="Basic Arithmetic">
                <div className="wrapper">
                  <Arithmetic />
                </div>
              </Tab>
              <Tab tabClassName="tab" eventKey="multiparam" title="Multiple Parameters">
                <div className="wrapper">
                  <MultiParam/>
                </div>
              </Tab>
              <Tab tabClassName="tab" eventKey="calculus" title="Calculus">
                <div className="wrapper">
                  <Calculus />
                </div>
              </Tab>
              <Tab tabClassName="tab" eventKey="graping" title="Graphing">
                <div className="wrapper">
                  <Graphing />
                </div>
              </Tab>
              <Tab tabClassName="tab" eventKey="misc" title="Miscellaneous">
                <div className="wrapper">
                  <Misc />
                </div>
              </Tab>
              <Tab tabClassName="tab" eventKey="matrix" title="Matrix">
                <div className="wrapper">
                  <Matrix />
                </div>
              </Tab>
            </Tabs>
          </Container>
        </div>
      </>
    );
  }
}