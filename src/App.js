import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

class App extends Component {

  // We can specify a props in constructor(props) and super(props),
  // then we can provide a props using <App increment={1} />
  // {1} is needed since everything needs to be in javascript
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  // Life-cycle method, to run after the component has mounted
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  // Any custom class function defined in teh class has no "this" bounded, so need to bind in the ctor
  //     this.handleChange = this.handleChange.bind(this)
  // Alternatively, use arrow function, which will set "this" as where it is defined
  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  // 1. Do not define function inside render() since it will be executed whenever render() is called. Always assign a handle function definition so it only run when event is invoked, e.g. onSearchChange
  // 2. Pass function as handleChange props down to child component
  render() {

    // Delist the state and make a copy
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className='App'>
        <h1>Monsters Rolodex 2</h1>        
        <SearchBox onSearchChange={this.onSearchChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
