import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware,compose} from "redux";
import thunk from "redux-thunk"
import reducers from './reducers'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({reducer : reducers,middleware: [thunk]});

ReactDOM.render( <Provider store = {store}>
<App/>
</Provider>,document.getElementById('root'));
