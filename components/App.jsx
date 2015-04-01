"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var fuzzy         = require('fuzzy');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var data  = require('../public/data/places');
var title = "Some places in Italy";

var searchOptions = { extract: (p) => p.name };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }
  
  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    var search = this.state.search
      , places = this.props.places;

    if (search) {
      let result = fuzzy.filter(search, places, searchOptions);
      places = result.map((r) => r.original);
    }
    
    var links = places.map(function (place) {
      return (
        <li key={"place-" + place.id}>
          <Link to="place" params={{ id: place.id }}>{ place.name }</Link>
        </li>
      );
    });

    return (
      <DocumentTitle title={ title }>
        <div className="app">
          <h1>{ title }</h1>
          <ul className="master">
            <li>
              <input 
                name="search" 
                onChange={ this.handleChange.bind(this) } 
                value={ this.state.search } />
            </li>
            { links }
            <li>
              <Link to="index">
                <small>(back to index)</small>
              </Link>
            </li>
          </ul>
          <div className="detail">
            <RouteHandler />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

App.defaultProps = { places: data };

module.exports = App;
