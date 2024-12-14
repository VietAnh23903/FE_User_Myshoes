import React from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị giao diện fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // Tự động điều hướng đến trang login (nếu được cấu hình)
    if (this.props.navigate) {
      this.props.navigate("/login");
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Redirecting to login...</h1>;
    }
    return this.props.children; // Render children nếu không có lỗi
  }
}

export const ErrorBoundaryWithNavigate = (props) => {
  const navigate = useNavigate(); // Hook navigate từ React Router
  return <ErrorBoundary {...props} navigate={navigate} />;
};

export default ErrorBoundaryWithNavigate;
