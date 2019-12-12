import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
      isItFriday: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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
    return (
      <div className="App" >
        <form>
          <input
            type="text"
            onChange={this.onSearchChange}
          />
        </form>
        {
          this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
            <div key={item.objectID}><span>
              <a href={item.url}>{item.title}</a>
            </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                > Dismiss
              </button>
              </span>
              {/* {this.state.isItFriday ? "It's friday!" : "Not Friday"} */}
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
