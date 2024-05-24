import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

class PrivateRoute extends React.Component {
  state = {
    isAuthenticated: false,
    loading: true,
  };

  componentDidMount() {
    axios.get('http://localhost:3000/dashboard', { withCredentials: true })
      .then(res => {
        if (res && res.data === "Success") {
          this.setState({ isAuthenticated: true, loading: false });
        } else {
          this.setState({ isAuthenticated: false, loading: false });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ isAuthenticated: false, loading: false });
      });
  }

  render() {
    const { loading, isAuthenticated } = this.state;
    const { children } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
  }
}

export default PrivateRoute;
