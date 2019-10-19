import React from "react";
import ReactDOM from "react-dom";
import searchReducer from '../src/store/reducers/search'
import authReducer from '../src/store/reducers/auth'
import bookingReducer from '../src/store/reducers/booking'
import { BrowserRouter} from "react-router-dom";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import App from './App';
import "./styles.css";

 
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
  auth:authReducer,
  search:searchReducer,
  booking:bookingReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
document.body.style.margin = 0;
document.body.style.padding = 0;
const app = (
  <Provider store={store}>
      <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
    
)
const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
