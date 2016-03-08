import { expect } from 'chai';
import createHoc from '../modules';
import { render } from 'enzyme';
import * as React from 'react';

describe('hocompose', () => {
    const Component = (props) => <div>{ `${props.message} ${props.name}` }</div>;

    describe('onConstruct', () => {
        it('Should initiate state', () => {
            const customBehaviour1 = {
                onConstruct: (props) => ({
                    message: 'Hello'
                })
            };

            const customBehaviour2 = {
                onConstruct: (props) => ({
                    name: 'Thomas'
                })
            };

            const EnhancedComponent = createHoc([ customBehaviour1, customBehaviour2 ])(Component);
            const output = render(<EnhancedComponent />);

            expect(output.find('div').text()).to.equal('Hello Thomas');
        });
    });
});
