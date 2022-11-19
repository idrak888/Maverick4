import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing/main";
import Layout from "./pages/Layout/main"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;