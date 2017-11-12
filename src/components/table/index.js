import React , {Component} from 'react';
import { Button } from '../button';
import '../app/App.css';
import {sortBy, isEqual} from 'lodash';


const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

const largeColumn = {
    width: '40%'
};
const midColumn = {
    width: '30%'
};
const smallColumn = {
    width: '10%'
};

class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            list: props.list
        };

        this.onDelete = this.onDelete.bind(this);
        this.onSort = this.onSort.bind(this);
    }

    onDelete(itemKey){
        const updatedList = this.state.list.filter((item) => item.objectID !== itemKey);
        this.setState({ list: updatedList });
    }

    onSort(sortKey) {
        const updatedList = SORTS[sortKey](this.state.list);
        this.setState({ list: updatedList });
    }

    componentWillReceiveProps(nextProps) {

        let currentList = Object.assign({}, this.state.list);
        let nextList = Object.assign({}, nextProps.list);

        currentList = currentList.sort();
        nextList = nextList.sort();

        if (! isEqual(currentList, nextList)) {
            this.setState({ list: nextProps.list });
        }
    }



    render() {
        const {list} = this.state;

        const listItems = list.map((item) => {
            return(
                <div key={item.objectID} className="table-row">
                    <span style={largeColumn}>
                        <a href={item.url}> {item.title} </a>
                    </span>
                    <span style={midColumn}>{item.author}</span>
                    <span style={smallColumn}>{item.num_comments}</span>
                    <span style={smallColumn}>{item.points}</span>
                    <span style={smallColumn}>
                        <Button
                            onClick={() => this.onDelete(item.objectID)}
                            className="button-inline">
                            Delete
                        </Button>
                    </span>
                </div>
            )
        });

        return (
            <div className="table">
                <div className="table-header">
                    <span style={largeColumn}>
                        <Button onClick={() => this.onSort('TITLE')} className="button-inline">
                            Title
                        </Button>
                    </span>
                    <span style={midColumn}>
                        <Button onClick={() => this.onSort('AUTHOR')} className="button-inline">
                            Author
                        </Button>
                    </span>
                    <span style={smallColumn}>
                        <Button onClick={() => this.onSort('COMMENTS')} className="button-inline">
                            Comments
                        </Button>
                    </span>
                    <span style={smallColumn}>
                        <Button onClick={() => this.onSort('POINTS')} className="button-inline">
                            Points
                        </Button>
                    </span>
                    <span style={smallColumn}>
                        Archive
                    </span>
                </div>

                { listItems }

            </div>
        );
    }
}


export default Table;