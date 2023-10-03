import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './Components/Landing';
import { ToastContainer} from 'react-toastify';
import  './scss/body.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Landing />
    <ToastContainer/>
  </>
);

export const fetchUrl = process.env.REACT_APP_FetchUrl
export const frontUrl = process.env.REACT_APP_FrontUrl

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

