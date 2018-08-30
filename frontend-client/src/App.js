import React, { Component } from 'react';
import BookList from "./components/BookList"

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Kaikki Kirjat!</h1>
        <BookList/>
      </div>
    );
  }
}

export default App;
