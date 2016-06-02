import { expect } from 'chai';
import createHoc from '../modules';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import React from 'react';

describe('componentDidMount', () => {
    function Component(props) {
        return <div>{ `${props.message} ${props.name}${props._private || ''}` }</div>;
    }

    it('should be called with model when component did mount', () => {
        const componentDidMount = spy();
        const customBehaviour = () => ({
            state: {
                a: 1
            },
            componentDidMount
        });

        const EnhancedComponent = createHoc([ customBehaviour ])(Component);
        const output = mount(<EnhancedComponent b={2} />);
        const model = {
            state: { a: 1 },
            props: { b: 2 },
            context: {}
        };

        expect(componentDidMount).to.have.been.calledWith(model);
    });

    it('should save unmounting thunks returned by mounting handlers', () => {
        const componentWillUnmount = spy();
        const componentDidMount = () => componentWillUnmount;
        const customBehaviour = () => ({
            state: {
                a: 1
            },
            componentDidMount
        });

        const EnhancedComponent = createHoc([ customBehaviour ])(Component);
        const instance = <EnhancedComponent b={2} />;
        const output = mount(instance);

        expect(output.node.unmountHandlers.length).to.equal(1);

        output.unmount();

        expect(componentWillUnmount).to.have.beenCalled;
    });
});
