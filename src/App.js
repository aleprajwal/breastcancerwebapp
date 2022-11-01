import React from 'react';
import './css/App.css';
import Form from './components/featureForm';
import Report from './components/reportSummary';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/report' element={<Report/>}/>
    </Routes>
  </Router>
  );
}

export default App;
