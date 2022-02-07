import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import {BrowserRouter as Router} from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <App />
      </Router>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
 