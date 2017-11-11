import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch';

import Search from '../search';
import Table from '../table';


const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_QUERY = '22';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            result: null,
            currentPage: 0,
            searchTerm: DEFAULT_QUERY,
            loading: true,
            error: null
        }

        this.onDelete = this.onDelete.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setStories = this.setStories.bind(this);
        this.fetchStories = this.fetchStories.bind(this);
        this.onFetchNextPage = this.onFetchNextPage.bind(this);
    }

    onDelete(itemKey){
        const updatedList = this.state.result.hits.filter((item) => item.objectID !== itemKey);
        this.setState({
            result: Object.assign({}, this.state.result, {hits: updatedList})
        });
    }

    onSearch(event){
        this.setState({
            searchTerm: event.target.value,
            currentPage: 0,
            loading: true
        }, this.fetchStories);
    }

    onSubmit (event){
        this.setState({
            currentPage: 0,
            loading: true
        }, this.fetchStories);

        event.preventDefault();
    }

    setStories(stories){
        this.setState({
            result: stories,
            loading: false
        });
    }

    fetchStories(){
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${this.state.searchTerm}&${PARAM_PAGE}${this.state.currentPage}`)
            .then(response => response.json())
            .then(result => this.setStories(result))
            .catch(e => {this.setState({ error: e.toString(), loading: false})});
    }

    onFetchNextPage () {
        this.setState({
            currentPage: this.state.currentPage + 1,
            loading: true
        }, this.fetchStories);
    }

    render() {
        const {searchTerm, result, loading, error} = this.state;

        const hideStyle = { display: 'none' };
        const showStyle = { display: 'block' };

        return (

            <div className="page">

                <div className="interactions">
                    <Search value={searchTerm}
                            onChange={this.onSearch}
                            onSubmit={this.onSubmit}
                            onNextPage={this.onFetchNextPage}>
                        Search
                    </Search>
                </div>

                {
                    loading
                    ? <div className="loader"></div>
                    : error
                        ? <div className="interactions">Sorry something went wrong: {error}</div>
                        : result && result.hits && result.hits.length > 0
                            ? <Table  style={loading ? hideStyle : showStyle}
                                  list={result.hits}
                                  onDelete={this.onDelete} />

                            : <div style={{ textAlign: 'center', margin:'auto' }}>
                                <p>No Results Found</p>
                              </div>
                }

            </div>
        );
    }

    componentDidMount(){
        this.fetchStories();
    }
}

export default App;

