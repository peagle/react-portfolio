import React, { Component } from 'react';

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



    render() {
        const listItems = this.state.list.filter(isSearched(this.state.searchTerm)).map((item) => {
            return <li key={item.objectID}>
                    <div>{item.title} &nbsp; &nbsp;
                        <span><button onClick={() => this.onDelete(item.objectID)} >X</button></span>
                    </div>
                </li>
        });

        return (
            <div>
                <div>
                    <form>
                        <input type="text" name="search" onChange={this.onSearch}></input>
                    </form>
                </div>
                <ul>
                 {listItems}
                </ul>
            </div>
        );
    }
}

export default App;
