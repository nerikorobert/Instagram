/* eslint-disable jsx-a11y/anchor-is-valid */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App, { ROUTES } from './App'; // Import ROUTES from App
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/tailwind.css'; 

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>
);
