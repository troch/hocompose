import { expect } from 'chai';
import createHoc from '../modules';
import { resolveBehaviours, collect } from '../modules/utils';
import { render } from 'enzyme';
import React from 'react';

describe('Behaviour', () => {
    const customBehaviour1 = () => ({
        state: {
            message: 'Hello'
        }
    });

    const customBehaviour2 = () => ({
        state: {
            name: 'Thomas'
        }
    });

    const customBehaviour3 = () => ({
        state: {
            city: 'Glasgow'
        }
    });

    function Component(props) {
        return <div>{ `${props.message} ${props.name}${props._private || ''}` }</div>;
    }

    it('should compose onConstruct results', () => {
        const factoryRes = [ customBehaviour1, customBehaviour2 ].map(b => b());
        const actual = collect('state', factoryRes);

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

    it('should handle behaviours as functions', () => {
        const behaviours = resolveBehaviours([ customBehaviour1, customBehaviour2, customBehaviour3 ], {});
        const state = collect('state', behaviours);

        expect(state).to.eql({
            message: 'Hello',
            name: 'Thomas',
            city: 'Glasgow'
        });
    });
});
