import React, { Component } from 'react';
import moment from 'moment';
//import earthquakes from '../data/earthquakes';
require('isomorphic-fetch');
require('es6-promise').polyfill();

export default class EarthquakeList extends Component {
    constructor(props) {
        super(props);
        this.state = { earthquakes:{features:[]} };
    }
    componentDidMount() {
        var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'

        fetch(url)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(data => {
                console.log('sup', data)
                this.setState({earthquakes:data});
            });
    }
    render() {
        return (
            <div className="quake-list">
                <div className="row">
                    {this.state.earthquakes.features.map(earthquake => (
                        <div className="col-sm-6" key={earthquake.id}>
                            <div className="card" >
                                <div className="card-block">
                                    <h4 className="card-title">{earthquake.properties.place}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Magnitude: {earthquake.properties.mag}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Time: {moment(earthquake.time).format('llll')}</h6>
                                    <p className="card-text">Coordinates: {earthquake.geometry.coordinates}</p>
                                    <a href={earthquake.properties.url} className="card-link">USGS Event Link</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
} 