// import React from 'react';
// import TestConnection from './TestConnection.jsx';



// console.log("App component loaded");

// const App = () => (
//     <div>
//          <TestConnection /> 
//         <p>Hello world</p>
//     </div>
// );

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App