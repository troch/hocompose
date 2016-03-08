import { expect } from 'chai';
import createHoc from '../modules';
import React from 'react';

describe('displayName', () => {
    const customBehaviour1 = {
        name: 'customBehaviour1'
    };

    const customBehaviour2 = {
        name: 'customBehaviour2'
    };

    function MyComponent() {
        return <div>Hi</div>;
    };

    it('should inject state into props', () => {
        const EnhancedComponent = createHoc([ customBehaviour1, customBehaviour2 ])(MyComponent);

        expect(EnhancedComponent.displayName)
            .to.equal('Hocompose[customBehaviour1,customBehaviour2](MyComponent)');
    });
});
