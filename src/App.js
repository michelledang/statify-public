import React, { Component } from "react";
import $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Chart from "./Chart";
import Sidebar from "./Sidebar";
import { CHART_TYPES } from "./constants";
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
      current: CHART_TYPES.artists,
      artists: [{
        images: [{ url: "" }],
        name: "",
        genres: [],
      }],
      tracks: [{
        artists: [{ name: "" }],
        name: "",
        album: { images: [{url: ""}] }
      }],
      me: {
        images: [{ url: "" }],
        display_name: ""
      }
    };
    this.getMe = this.getMe.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
  }
  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token
      });
      this.getMe(_token);
      this.getTopArtists(_token);
      this.getTopTracks(_token);
    }
  }

  setCurrent = (type) => {
    this.setState({ current: type });
  }

  getMe(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          me: data
        });
      }
    });
  }

  getTopArtists(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          artists: data.items
        });
      }
    });
  }

  getTopTracks(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          tracks: data.items
        });
      }
    });
  }

  render() {
    if (!this.state.token) {
      return (
        <div className="Login">
          <div className="Welcome">
            <p className="welcome-message" >
              Log in to view your Spotify stats like top artists, songs, genres and moods!
              </p>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
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
        <Sidebar
          me={this.state.me}
          current={this.state.current}
          handleCurrentSelection={this.setCurrent}
        />
        <Chart
          artists={this.state.artists}
          tracks={this.state.tracks}
          current={this.state.current}
        />
      </div>
    );
  }
}

export default App;