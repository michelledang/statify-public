import React, { Component } from "react";
import { CHART_TYPES } from "./constants";
import "./Sidebar.css";

class Sidebar extends Component {

    getTextClass(text) {
        if (this.props.current === text) {
            return "sidebar-selected";
        }
        return "sidebar-unselected";
    }

    render() {
        return (
            <div className="sidebar-wrapper">
                <img className="sidebar-img" src={this.props.me.images[0].url} />
                <h4 className="sidebar-name" >Made for {this.props.me.display_name}!</h4>
    
                <p className={this.getTextClass(CHART_TYPES.artists)}
                    onClick={() => this.props.handleCurrentSelection(CHART_TYPES.artists)}>Top Artists</p>
                <p className={this.getTextClass(CHART_TYPES.tracks)}
                    onClick={() => this.props.handleCurrentSelection(CHART_TYPES.tracks)}>Top Tracks</p>
                <p className={this.getTextClass(CHART_TYPES.genres)}
                    onClick={() => this.props.handleCurrentSelection(CHART_TYPES.genres)}>Top Genres</p>
                <p className={this.getTextClass(CHART_TYPES.moods)}
                    onClick={() => this.props.handleCurrentSelection(CHART_TYPES.moods)}>Top Moods</p>
            </div>
        );
    }
}

export default Sidebar;