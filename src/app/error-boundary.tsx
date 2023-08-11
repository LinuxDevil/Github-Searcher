import { Component, ErrorInfo, ReactNode } from "react";
import Button from "@/components/shared/button/button";

interface IErrorBoundaryProps {
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props)

    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  }
  render() {
    if (this.state.hasError) {
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
