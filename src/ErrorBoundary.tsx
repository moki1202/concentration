import _ from "lodash";
import React from "react";

class ErrorBoundary extends React.Component<any, any> {
  state = { has_error: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { has_error: true, error };
  }

  componentDidCatch(error: any, error_info: any) {
    console.error("Caught an error:", error, error_info);
  }

  render() {
    if (this.state.has_error || !_.isEmpty(this.props.app_error)) {
      return <p>error</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
