import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


function isSearched(searchTerm) {
  return function (item) {
    return !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  setSearchTopstories(result) {
    this.setState({ result });
  }
  fetchSearchTopstories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    console.log("ComponentDidMount ran");
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
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
    const { searchTerm, result } = this.state;

    if (!result) { return null; }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >Search
          </Search>
        </div>
        <Table
          list={result.hits}
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

const Span = styled.span`
width: ${props => props.width || '10%'};
`

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <Span width={'40%'}>
          <a href={item.url}>{item.title}</a>
        </Span>
        <Span width={'30%'}>{item.author}</Span>
        <Span>{item.num_comments}</Span>
        <Span>{item.points}</Span>
        <Span>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline">
            Dismiss
              </Button>
        </Span>
      </div>
    )}
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >{children}
  </button>
export default App;
