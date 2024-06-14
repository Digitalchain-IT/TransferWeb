import React from 'react';
import { Route, Redirect } from 'wouter';
import Login from './authentication/Login';
import './authentication/Auth.css';

const App: React.FC = () => {
  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </div>
  );
};

export default App;
