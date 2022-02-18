import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/Users/Users";
import Posts from "./components/Posts/Posts";
import Todos from "./components/Todos/Todos";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import Error from "./components/Error/Error";
import Layout from "./components/Layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <Router>
      <Layout>
        <ErrorBoundary>
          <Switch>
            <Route exact path='/' component={Users} />
            <Route path='/posts/:id' component={Posts} />
            <Route path='/todos/:userId/:todoId' component={CreateTodo} />
            <Route path='/todos/create' component={CreateTodo} />
            <Route path='/todos' component={Todos} />
            <Route component={Error} />
          </Switch>
        </ErrorBoundary>
      </Layout>
    </Router>
  );
}

export default App;
