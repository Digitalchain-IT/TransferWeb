import React from 'react';
import { Route, Redirect } from 'wouter';
import Login from './authentication/Login';
import Dashboard from './Dashboard';
import './authentication/Auth.css';

const App: React.FC = () => {
  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/">
        <Redirect to="/login" />
        hello
      </Route>
    </div>
  );
};

export default App;
