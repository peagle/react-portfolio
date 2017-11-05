import React from 'react';

import Button from '../button';

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

export default Search;