import React, { Component } from 'react';
import Button from './Button'; // Import a component from another file
import './App.css';

const list = [
  {
    title: 'React1',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, {
    title: 'Redux2',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },];

function isSearched(searchTerm) {
  return function (item) {
    return !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

// API KEY: APPID=f8384513fad5f91ea04d07a2cbf916ec
const API = "http://api.openweathermap.org/data/2.5/weather?q=stockholm,se&APPID=f8384513fad5f91ea04d07a2cbf916ec&units=metric";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
      isItFriday: true,
      weather: ''
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  componentDidMount() {
    console.log("CDM ran")
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ weather: data.main.feels_like }));
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onDismiss(id) {
    console.log("onDismiss ran with id: " + id);
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    const { searchTerm, list, weather } = this.state;
    return (
      <div className="App" >
        The temperature right now feels like {weather || '?'}
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >Search
          </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}
const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    /> </form>

/* class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
        /> </form>
    );
  }
} */

// TODO: Refactor Table to a FSC (Functional Stateless Component)
class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>
            </span>
          </div>)}
      </div>);
  }
}
//TODO: Refactor
/* class Button extends Component {
  render() {
    const { onClick, className = '', children,
    } = this.props;
    return (<button
      onClick={onClick}
      className={className}
      type="button"
    >{children}
    </button>);
  }
} */
export default App;
