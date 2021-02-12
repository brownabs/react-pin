import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCard';
import Pins from './Pins';
import { getAllUserBoards } from '../helpers/data/boardData';
import { getAllUserPins } from '../helpers/data/pinData';
import getUid from '../helpers/data/authData';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.text.toLowerCase();
    const searchType = this.props.match.params.type;
    const currentUser = getUid();

    if (searchType === 'boards') {
      getAllUserBoards(currentUser).then((boardsArray) => {
        const boardResults = boardsArray.filter((board) => board.name.toLowerCase().includes(searchTerm) || board.description.toLowerCase()).includes(searchTerm);
        this.setState({
          searchType,
          searchTerm,
          results: boardResults,
        });
      });
    } else {
      getAllUserPins(currentUser).then((pinsArray) => {
        const pinResults = pinsArray.filter((pin) => pin.name.toLowerCase().includes(searchTerm) || pin.description.toLowerCase().includes(searchTerm));
        this.setState({
          searchTerm,
          searchType,
          results: pinResults,
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.text) {
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;
    const showResults = () => (
      results.map((result) => (
        searchType === 'boards' ? <BoardsCard key={result.firebaseKey} board={result}/> : <Pins searchedPins={result}/>
      ))
    );
    return (
       <>
       <div>
       <h1>Search Results:</h1>
        { results.length ? showResults() : <h1>There are no {searchType} to view</h1>}
      </div>
      </>
    );
  }
}
