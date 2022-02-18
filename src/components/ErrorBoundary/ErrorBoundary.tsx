import React from "react";
import Error from "../Error/Error";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
