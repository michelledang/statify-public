import React, { Component } from 'react';
import ArtistItem from './ArtistItem';
import TrackItem from './TrackItem';
import GenreItem from './GenreItem';
import { CHART_TYPES, TIME_RANGES } from './constants';
import './Chart.css';

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      current: CHART_TYPES['Top Artists'],
    };
  }
  getGenresFromArtists() {
    const genres = this.props.artists.reduce((acc, artist) => {
      artist.genres.map((genre) => {
        if (acc[genre]) {
          acc[genre] += 1;
        } else {
          acc[genre] = 1;
        }
      });
      return acc;
    }, {});

    const sortedGenres = Object.keys(genres).sort(
      (a, b) => genres[b] - genres[a]
    );
    let topGenres = [];
    for (var i = 0; i < Math.min(50, sortedGenres.length); i++) {
      topGenres.push([sortedGenres[i], genres[sortedGenres[i]]]);
    }
    return topGenres;
  }

  render() {
    return (
      <div className="chart-wrapper">
        <div className="sidebar-options">
          <select
            id="data-type"
            name="data-type"
            className="chart-selector"
            style={{ fontFamily: 'Helvetica Neue, sans-serif, Arial' }}
            onChange={(e) => {
              this.props.handleCurrentSelection(e.target.value);
              this.setState({ current: e.target.value });
            }}
          >
            {Object.keys(CHART_TYPES).map((key) => {
              return (
                <option key={key} value={CHART_TYPES[key]}>
                  {key}
                </option>
              );
            })}
          </select>
          <p className="chart-p">of</p>
          <select
            id="time-range"
            name="time-range"
            className="chart-selector"
            style={{ fontFamily: 'Helvetica Neue, sans-serif, Arial' }}
            onChange={(e) => {
              this.props.handleTimeSelection(e.target.value);
            }}
          >
            {Object.keys(TIME_RANGES).map((key) => {
              return (
                <option key={key} value={TIME_RANGES[key]}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>
        <div className="main-wrapper">
          {this.state.current === CHART_TYPES['Top Artists'] &&
            this.props.artists.map((artist, index) => (
              <ArtistItem
                name={artist.name}
                imageUrl={artist.images[0].url}
                index={index + 1}
                key={index}
              />
            ))}
          {this.state.current === CHART_TYPES['Top Tracks'] &&
            this.props.tracks.map((track, index) => (
              <TrackItem
                name={track.name}
                imageUrl={track.album.images[0].url}
                artist={track.artists[0].name}
                index={index + 1}
                key={index}
              />
            ))}
          {this.state.current === CHART_TYPES['Top Genres'] &&
            this.getGenresFromArtists().map(([genre, score], index) => (
              <GenreItem
                name={genre}
                score={score}
                percent={score / 50}
                index={index + 1}
                key={index}
              />
            ))}
          {this.state.current === CHART_TYPES['Top Moods'] && (
            <p>Coming soon!</p>
          )}
        </div>
      </div>
    );
  }
}

export default Chart;
