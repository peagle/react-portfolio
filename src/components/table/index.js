import React , {Component} from 'react';
import { Button } from '../button';
import '../app/App.css';
import {sortBy, isEqual} from 'lodash';
import 'font-awesome/css/font-awesome.min.css';


const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments'),
    POINTS: list => sortBy(list, 'points'),
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
            list: props.list,
            sortKey: 'NONE',
            reverseOrder: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onSort = this.onSort.bind(this);
    }

    onDelete(itemKey){
        const updatedList = this.state.list.filter((item) => item.objectID !== itemKey);
        this.setState({ list: updatedList });
    }

    onSort(sortKey) {
        let updatedList = SORTS[sortKey](this.state.list);
        updatedList = this.state.reverseOrder ? updatedList.reverse() : updatedList;
        this.setState({ list: updatedList, sortKey: sortKey , reverseOrder: !this.state.reverseOrder});
    }

    componentWillReceiveProps(nextProps) {
        let currentList = Object.assign({}, this.state.list);
        let nextList = Object.assign({}, nextProps.list);

        currentList = currentList.sort();
        nextList = nextList.sort();

        if (! isEqual(currentList, nextList))
        {
            let updatedList = SORTS[this.state.sortKey](nextList);
            console.log(this.state.sortKey);
            updatedList = this.state.reverseOrder ? updatedList.reverse() : updatedList;
            this.setState({ list: updatedList });
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
                        <Button onClick={() => this.onSort('TITLE')} className={`button-inline ${this.state.sortKey === 'TITLE' && 'button-active'}`}>
                            Title
                            {
                                (this.state.sortKey === 'TITLE')
                                    ? <span className={this.state.reverseOrder ? 'fa fa-arrow-up': 'fa fa-arrow-down'}></span>
                                    : ''
                            }
                        </Button>
                    </span>
                    <span style={midColumn}>
                        <Button onClick={() => this.onSort('AUTHOR')} className={`button-inline ${this.state.sortKey === 'AUTHOR' && 'button-active'}`}>
                            Author
                            {
                                (this.state.sortKey === 'AUTHOR')
                                ? <span className={this.state.reverseOrder ? 'fa fa-arrow-up': 'fa fa-arrow-down'}></span>
                                : ''
                            }
                        </Button>
                    </span>
                    <span style={smallColumn}>
                        <Button onClick={() => this.onSort('COMMENTS')} className={`button-inline ${this.state.sortKey === 'COMMENTS' && 'button-active'}`}>
                            Comments
                            {
                                (this.state.sortKey === 'COMMENTS')
                                    ? <span className={this.state.reverseOrder ? 'fa fa-arrow-up': 'fa fa-arrow-down'}></span>
                                    : ''
                            }
                        </Button>
                    </span>
                    <span style={smallColumn}>
                        <Button onClick={() => this.onSort('POINTS')} className={`button-inline ${this.state.sortKey === 'POINTS' && 'button-active'}`}>
                            Points
                            {
                                (this.state.sortKey === 'POINTS')
                                    ? <span className={this.state.reverseOrder ? 'fa fa-arrow-up': 'fa fa-arrow-down'}></span>
                                    : ''
                            }
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