import React, {Component} from 'react';

import {ButtonWithLoading} from '../button';

class Search extends Component {

    render(){
        const{onSubmit, onChange, value, onNextPage, isLoading, children} = this.props;

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
                    <ButtonWithLoading onClick={onNextPage}
                            isLoading={isLoading}>
                        Next Page
                    </ButtonWithLoading>
                </form>
            </div>
        );
    }

    componentDidMount(){
       // this.input.focus();
    }
}

export default Search;