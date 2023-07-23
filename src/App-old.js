import React, { Component } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import Scheduler from './components/Scheduler';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
import './App.css';

const data = [
  { start_date: '2023-07-10 6:00', end_date: '2023-07-10 8:00', text: 'Event 1', id: 1 },
  { start_date: '2023-07-13 10:00', end_date: '2023-07-13 18:00', text: 'Event 2', id: 2 }
];

const domain = 'dev-6w5a77y7dcz41k3z.us.auth0.com';
const clientId = 'eFxEUe4rGT6h8yrxleQ8zvysiESfkhGH';

class App extends Component {
  state = {
    currentTimeFormatState: true,
    messages: [],
    isLoggedIn: false
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [newMessage, ...this.state.messages];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : '';
    const message = `event ${action}: ${id} ${text}`;
    this.addMessage(message);
  };

  handleTimeFormatStateChange = (state) => {
    this.setState({
      currentTimeFormatState: state
    });
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { currentTimeFormatState, messages, isLoggedIn } = this.state;
    return (
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <div>
          <center>
            <h1>Intent Email</h1>
            <Login/>
            <Logout/>
            <Profile/>
          </center>
          <div className="tool-bar">
            <Toolbar
              timeFormatState={currentTimeFormatState}
              onTimeFormatStateChange={this.handleTimeFormatStateChange}
            />
          </div>
          <div className="scheduler-container">
            <Scheduler
              events={data}
              timeFormatState={currentTimeFormatState}
              onDataUpdated={this.logDataUpdate}
            />
          </div>
          <MessageArea messages={messages} />
        </div>
      </Auth0Provider>
    );
  }
}

export default App;