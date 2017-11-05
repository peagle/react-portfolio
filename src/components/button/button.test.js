import React from 'react';
import ReactDOM from 'react-dom';
import Button from './index';
import renderer from 'react-test-renderer';


describe('Button', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button />, div);
    });

    test('has a valid snapshot', () => {
        const component = renderer.create( <Button /> );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
