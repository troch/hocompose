import { expect } from 'chai';
import createHoc from '../modules';
import { onConstruct, collect } from '../modules/utils';
import { render } from 'enzyme';
import React from 'react';

describe('onConstruct', () => {
    const customBehaviour1 = {
        onConstruct: () => ({
            state: {
                message: 'Hello'
            }
        })
    };

    const customBehaviour2 = {
        onConstruct: () => ({
            state: {
                name: 'Thomas'
            }
        })
    };

    function Component(props) {
        return <div>{ `${props.message} ${props.name}${props._private || ''}` }</div>;
    }

    it('should compose onConstruct results', () => {
        const onConstructRes = onConstruct([ customBehaviour1, customBehaviour2 ], {}, {});
        const actual = collect('state', onConstructRes);

        expect(actual).to.eql({
            message: 'Hello',
            name: 'Thomas'
        });
    });

    it('should inject state into props', () => {
        const EnhancedComponent = createHoc([ customBehaviour1, customBehaviour2 ])(Component);
        const output = render(<EnhancedComponent />);

        expect(output.find('div').text()).to.equal('Hello Thomas');
    });
});
