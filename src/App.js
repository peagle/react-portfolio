import React, { Component } from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Vuejs',
        url: 'https://vuejs.com',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

const isSearched = (searchTerm) => (item) => item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());


class App extends Component {

    constructor(){
        super();

        this.state = {
            list: list,
            searchTerm: ''
        }

        this.onDelete = this.onDelete.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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



    render() {
        const {searchTerm, list} = this.state;

        return (
            <div className="page">

                <div className="interactions">
                    <Search value={searchTerm}
                            onChange={this.onSearch}
                            onSubmit={this.onSubmit}>
                        Search
                    </Search>
                </div>

                <Table list={list}
                       pattern={searchTerm}
                       onDelete={this.onDelete}
                />
            </div>
        );
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


