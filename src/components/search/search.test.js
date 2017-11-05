import React from 'react';
import ReactDOM from 'react-dom';
import Search from './index';
import renderer from 'react-test-renderer';


describe('Search', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search />, div);
    });

    test('has a valid snapshot', () => {
        const component = renderer.create( <Search /> );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
