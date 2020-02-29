import React from 'react';
import './error.scss';

class ErrorBoundry extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrors: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrors: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
  render() {
    if (this.state.hasErrors) {
      return (
        <div clasName="container-overlay-error">
          <div className="container-error">
            <div className="container-text">Something went wrong</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundry;
