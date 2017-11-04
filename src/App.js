import React, { Component } from 'react';
import './App.css';

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
            loading: false
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
            .catch(e => e);
    }

    onFetchNextPage () {
        this.setState({
            currentPage: this.state.currentPage + 1,
            loading: true
        }, this.fetchStories);
    }

    render() {
        const {searchTerm, result, loading} = this.state;

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

                <div className={loading ? "loader" : ""}>
                </div>
                {
                    result && result.hits && result.hits.length > 0
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

function Search (props) {
    const{onSubmit, onChange, value, onNextPage, children} = props;

    return (
        <div>
            <form onSubmit={onSubmit}>
                {children}: &nbsp;
                <input type="text"
                       name="search"
                       onChange={onChange}
                       value={value}
                />
                <button type="submit">
                    {children}
                </button>
                <Button onClick={onNextPage}>
                    Next Page
                </Button>
            </form>
        </div>
    );
}

function Table ({list, onDelete}){

    const largeColumn = {
        width: '40%'
    }
    const midColumn = {
        width: '30%'
    }
    const smallColumn = {
        width: '10%'
    }

    const listItem = list.map((item) => {
        return (
            <div key={item.objectID} className="table-row">
                <span style={largeColumn}>
                    <a href={item.url}> {item.title} </a>
                </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.num_comments}</span>
                <span style={smallColumn}>{item.points}</span>
                <span style={smallColumn}>
                    <Button
                        onClick={() => onDelete(item.objectID)}
                        className="button-inline"
                    >
                        Delete
                    </Button>
                </span>
            </div>
        );
    });

    return (
        <div className="table">
            {listItem}
        </div>
    );
}

function Button ( {onClick, children, className =''}) {
    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>
    );
}

export default App;


