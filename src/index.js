import React from 'react';
import StepWizard from 'react-step-wizard';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import BlindDraft from './components/BlindDraft';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import ThirdPage from './components/ThirdPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div id="root">
    <StepWizard>
      <FirstPage/>
      <SecondPage/>
      <ThirdPage/>
    </StepWizard>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
