import { expect } from 'chai';
import createHoc from '../modules';
import { render } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';

describe('onConstruct', () => {
    const customBehaviour1 = {
        onConstruct: (props) => ({
            message: 'Hello',
            _private: 'Thomas'
        })
    };

    const customBehaviour2 = {
        onConstruct: (props) => ({
            name: 'Thomas'
        })
    };

    function Component(props) {
        return <div>{ `${props.message} ${props.name}${props._private || ''}` }</div>;
    }

    it('should inject state into props', () => {
        const EnhancedComponent = createHoc([ customBehaviour1, customBehaviour2 ])(Component);
        const output = render(<EnhancedComponent />);

        expect(output.find('div').text()).to.equal('Hello Thomas');
    });

    it('should not inject private state values', () => {
        const MyComponent = props => <div>{ `${props.message} ${props._private || ''}` }</div>;
        const EnhancedComponent = createHoc([ customBehaviour1 ])(MyComponent);

        const output = render(<EnhancedComponent />);
        expect(output.find('div').text()).to.equal('Hello ');
    });
});
