# Redux store subscription

The following example is a very basic example of connecting to a redux store. It assumes you would access your store instance from React context.

```js
import { PropTypes } from 'react';

const reduxConnectBehaviour = (initialModel) => {
    const store = initialModel.context.store;

    return {
        state: initialModel.context.store.getState(),
        componentDidMount: (model, setState) => {
            const onStoreUpdate = () => setState(store.getState());
            
            return store.subscribe(onStoreUpdate);
        }
    };
});

reduxConnectBehaviour.contextTypes = {
    store: PropTypes.object.isRequired
};
```
