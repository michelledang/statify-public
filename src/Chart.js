import React, { Component } from "react";
import ArtistItem from "./ArtistItem";
import TrackItem from "./TrackItem";
import GenreItem from "./GenreItem";
import { CHART_TYPES } from "./constants";
import "./Chart.css";

class Chart extends Component {

    getGenresFromArtists() {
        const genres = this.props.artists.reduce((acc, artist) => {
            artist.genres.map(genre => {
                if (acc[genre]) {
                    acc[genre] += 1;
                } else {
                    acc[genre] = 1;
                }
            });
            return acc;
        }, {});

        const sortedGenres = Object.keys(genres).sort((a,b) => genres[b] - genres[a]);
        let topGenres = [];
        console.log(sortedGenres);
        for(var i = 0; i < Math.min(20, sortedGenres.length); i++) {
            topGenres.push([ sortedGenres[i], genres[sortedGenres[i]] ]);
        }
        return topGenres;
    }

    render() {
        return (
            <div className="main-wrapper">
            {(this.props.current === CHART_TYPES.artists) && (
                this.props.artists.map((artist, index) =>
                    <ArtistItem
                        name={artist.name}
                        imageUrl={artist.images[0].url}
                        key={index}
                    />
                )
            )}
            {(this.props.current === CHART_TYPES.tracks) && (
                this.props.tracks.map((track, index) =>
                    <TrackItem
                        name={track.name}
                        imageUrl={track.album.images[0].url}
                        artist={track.artists[0].name}
                        key={index}
                    />
                )
            )}
            {(this.props.current === CHART_TYPES.genres) && (
                this.getGenresFromArtists().map(([genre, score], index) =>
                    <GenreItem
                        name={genre}
                        score={score}
                        key={index}
                    />
                )
            )}
            {(this.props.current === CHART_TYPES.moods) && (
                <p>Coming soon!</p>
            )}            
            </div>
        );
    }


}

export default Chart;