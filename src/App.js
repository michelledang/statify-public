import React, { Component } from 'react';
import $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import hash from './hash';
import Chart from './Chart';
import Sidebar from './Sidebar';
import { AUDIO_FEATURES, CHART_TYPES, TIME_RANGES } from './constants';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      current: CHART_TYPES['Top Artists'],
      time: TIME_RANGES['Last Month'],
      artists: [
        {
          images: [{ url: '' }],
          name: '',
          genres: [],
        },
      ],
      tracks: [
        {
          artists: [{ name: '' }],
          name: '',
          album: { images: [{ url: '' }] },
        },
      ],
      me: {
        images: [{ url: '' }],
        display_name: '',
      },
      moods: [{}],
    };
    this.getMe = this.getMe.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
    this.getTopMoods = this.getTopMoods.bind(this);
  }
  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getMe(_token);
      this.getTopArtists(_token, this.state.time);
      this.getTopTracks(_token, this.state.time);
    }
  }

  setCurrent = (type) => {
    this.setState({ current: type });
  };

  setTime = (range) => {
    this.setState({ time: range });
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getMe(_token);
      this.getTopArtists(_token, range);
      this.getTopTracks(_token, range);
    }
  };

  getMe(token) {
    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        this.setState({
          me: data,
        });
      },
    });
  }

  getTopArtists(token, time) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time}`,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        this.setState({
          artists: data.items,
        });
      },
    });
  }

  getTopTracks(token, time) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${time}`,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        this.setState({
          tracks: data.items,
        });
        this.getTopMoods(token);
      },
    });
  }

  getTopMoods(token) {
    const trackIds = this.state.tracks
      .map((track) => track.id)
      .reduce((acc, id) => {
        acc += id;
        acc += ',';
        return acc;
      }, '');
    $.ajax({
      url: `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (data) => {
        let averageMoods = {};
        AUDIO_FEATURES.map((feature) => {
          let totalMood = data.audio_features.reduce((acc, item) => {
            acc += item[feature];
            return acc;
          }, 0);
          averageMoods[feature] = totalMood / data.audio_features.length;
        });

        this.setState({
          moods: averageMoods,
        });
      },
    });
  }

  render() {
    if (!this.state.token) {
      return (
        <div className="Login">
          <div className="Welcome">
            <h1>Statify</h1>
            <p className="welcome-message">
              Log in to view your Spotify stats like top artists, songs, genres
              and moods!
            </p>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <Sidebar me={this.state.me} current={this.state.current} />
        <Chart
          artists={this.state.artists}
          tracks={this.state.tracks}
          moods={this.state.moods}
          current={this.state.current}
          handleCurrentSelection={this.setCurrent}
          handleTimeSelection={this.setTime}
        />
        <p id="footer">
          Built by{' '}
          <a href={'https://github.com/michelledang'} target="_blank">
            Michelle Dang
          </a>
        </p>
      </div>
    );
  }
}

export default App;
