import React, {Component} from 'react';

import Button from '../button';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = props;
    }

    render(){
        const{onSubmit, onChange, value, onNextPage, children} = this.state;
        let input;
        return (
            <div>
                <form onSubmit={onSubmit}>
                    {children}: &nbsp;
                    <input type="text"
                           name="search"
                           onChange={onChange}
                           value={value}
                           ref={inputRef => this.input = inputRef}
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

    componentDidMount(){
        this.input.focus();
    }
}

export default Search;