import React, { Component } from 'react';
import './App.css';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const DEFAULT_QUERY = 'redux';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const isSearched = (searchTerm) => (item) => item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());


class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY
        }

        this.onDelete = this.onDelete.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setStories = this.setStories.bind(this);
        this.fetchStories = this.fetchStories.bind(this);
    }

    onDelete(itemKey){
        const updatedList = this.state.list.filter((item) => item.objectID !== itemKey);
        this.setState({list: updatedList});
    }

    onSearch(event){
        this.setState({
            searchTerm: event.target.value
        });
    }

    onSubmit (event){
        this.setState({
            searchTerm: this.state.searchTerm.toUpperCase()
        });

        event.preventDefault();
    }

    setStories(stories){
        this.setState({ result: stories});
    }

    fetchStories(){
        fetch(url).
        then(response => response.json()).
        then(result => this.setStories(result)).
        catch(e => e);
    }



    render() {
        const {searchTerm, result} = this.state;

        if(! result) { return null; }

        return (
            <div className="page">

                <div className="interactions">
                    <Search value={searchTerm}
                            onChange={this.onSearch}
                            onSubmit={this.onSubmit}>
                        Search
                    </Search>
                </div>

                <Table list={result.hits}
                       pattern={searchTerm}
                       onDelete={this.onDelete}
                />
            </div>
        );
    }

    componentDidMount(){
        this.fetchStories();
    }
}

function Search (props) {
    const{onSubmit, onChange, value, children} = props;

    return (
        <div>
            <form onSubmit={onSubmit}>
                {children}: &nbsp;
                <input type="text"
                       name="search"
                       onChange={onChange}
                       value={value}
                />
            </form>
        </div>
    );
}


function Table ({list, pattern, onDelete}){

    const largeColumn = {
        width: '40%'
    }
    const midColumn = {
        width: '30%'
    }
    const smallColumn = {
        width: '10%'
    }

    const listItem = list.filter(isSearched(pattern)).map((item) => {
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


