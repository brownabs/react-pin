import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar';
import Routes from '../helpers/Routes';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user } = this.state;
    return (
      <div className='App'>
        <Router>
          <MyNavbar user={user}/>
          {/* TODO: make sure the user has been evaluated on each route load */}
          <div className='body-of-app'>
          { user !== null && <Routes user={user} /> }
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
