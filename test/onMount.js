import { expect } from 'chai';
import createHoc from '../modules';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import React from 'react';

describe('onMount', () => {
    const customBehaviour = {
        state: {
            a: 1
        },
        onMount: () => {}
    };

    function Component(props) {
        return <div>{ `${props.message} ${props.name}${props._private || ''}` }</div>;
    }

    it('should be called with model when component did mount', () => {
        spy(customBehaviour, 'onMount');

        const EnhancedComponent = createHoc([ customBehaviour ])(Component);
        const output = mount(<EnhancedComponent b={2} />);
        const model = {
            state: { a: 1 },
            props: { b: 2 },
            refs: {},
            context: {}
        };

        expect(customBehaviour.onMount).to.have.been.calledWith(model);
    });

    it('should save unmounting thunks returned by mounting handlers', () => {
        const unMount = spy();
        customBehaviour.onMount = () => unMount;

        const EnhancedComponent = createHoc([ customBehaviour ])(Component);
        const instance = <EnhancedComponent b={2} />;
        const output = mount(instance);

        expect(output.node.unmountHandlers.length).to.equal(1);
        expect(output.node.unmountHandlers[0]).to.equal(unMount);
    });
});
