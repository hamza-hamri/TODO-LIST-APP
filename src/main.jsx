import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux';
import ReducerTask from './Reducer/Reducer.js'
import './index.css'
import App from   './App.jsx'

const mystore = createStore(ReducerTask);
createRoot(document.getElementById('root')).render(
  <Provider store={mystore} >
    <StrictMode>
    <App />
  </StrictMode>
  </Provider>
  
)
