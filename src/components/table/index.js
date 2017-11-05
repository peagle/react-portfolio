import React from 'react';
import Button from '../button';
import '../app/App.css';


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

export default Table;