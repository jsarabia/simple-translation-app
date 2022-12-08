import React from 'react';
import StepWizard from 'react-step-wizard';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import ThirdPage from './components/ThirdPage';
import HomePage from './components/HomePage';
import AppBar from './components/AppBar';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { ProjectContextProvider } from './context/upload/ProjectsContext';


const theme = createTheme({
  palette: {
    secondary: { main: '#f9a825' },
    info: { main: '#bdbdbd' },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <ProjectContextProvider>
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
    </ProjectContextProvider>
  </ThemeProvider>
);
