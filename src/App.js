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
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

class App extends Component {
  render() {
        const listItems = list.map((item) => {
            return <li key={item.objectID}>{item.title}</li>
        });

        return (
            <div>
                <ul>
                 {listItems}
                </ul>
            </div>
        );
  }
}

export default App;
