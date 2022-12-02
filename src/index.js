import React from 'react';
import StepWizard from 'react-step-wizard';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';


import reportWebVitals from './reportWebVitals';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import ThirdPage from './components/ThirdPage';
import HomePage from './components/HomePage';
import AppBar from './components/AppBar';
import { createTheme, ThemeProvider  } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    secondary: { main: '#f9a825' },
    info: { main: '#bdbdbd' },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
  <ThemeProvider theme={theme}>
    <div id="root" class="main_container">
      <AppBar />
      <div class="stage">
        <StepWizard>
          <HomePage />
          <FirstPage />
          <SecondPage />
          <ThirdPage />
        </StepWizard>
      </div>
    </div>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
