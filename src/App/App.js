import React, { Component } from "react";
import GoogleApp from "../GoogleApp/GoogleApp";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
      sort: "",
      genres: "",
      error: null
    };
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenre(genres) {
    this.setState({
      genres
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const baseUrl = "http://localhost:8000/apps";
    const params = [];

    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }

    const query = params.join("&");
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          store: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: "Sorry, could not get apps at this time."
        });
      });
  }

  render() {
   const apps = this.state.store.map((app, i) => {
      return <GoogleApp {...app} key={i} />;
    });

    return (
      <main className="App">
        <h1>Google Play Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="filter">Filter: </label>
            <select
              id="filter"
              name="filter"
              onChange={e => this.setGenre(e.target.value)}
            >
              <option value="">None</option>
              <option value="action">Action</option>
              <option value="puzzle">Puzzle</option>
              <option value="strategy">Strategy</option>
              <option value="casual">Casual</option>
              <option value="arcade">Arcade</option>
              <option value="card">Card</option>
            </select>

            <label htmlFor="sort">Sort: </label>
            <select
              id="sort"
              name="sort"
              onChange={e => this.setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="rating">Rating</option>
              <option value="app">App</option>
            </select>
            <button type="submit">Submit</button>
          </form>
          <div className="App_error">{this.state.error}</div>
        </div>
        {apps}
      </main>
    );
  }
}
