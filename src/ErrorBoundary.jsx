/* eslint-disable max-len */
import React, { Component } from 'react';

// # Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in component constructors full the whole tree below them.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  // ? MUST return an updated state object and MUST NOT trigger side effects
  static getDerivedStateFromError(error) {
    return { error };
  }

  // ? CAN trigger side effects; commonly used to log out any errors
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <h1>An error has occurred in a child component!</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
