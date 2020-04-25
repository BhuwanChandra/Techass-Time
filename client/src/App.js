import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './App.css';
import Navbar from './components/Navbar';
import Routing from './components/Routing';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
