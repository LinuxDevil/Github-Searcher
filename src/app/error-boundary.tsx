import { Component } from "react";
import Button from "@/components/shared/button/button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Github Searcher caught an error! 😶 </h2>
          <Button
            text="Try again 🤓?"
            onClick={() => this.setState({ hasError: false })}
          />
        </div>
      )
    }


    return this.props.children
  }
}

export default ErrorBoundary
