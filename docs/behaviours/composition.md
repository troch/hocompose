# Composition

`hocompose` exports a HOC creation function as default.

```js
import { compose } from 'hocompose`;
import { behaviour1, behaviour2 } from './my-behaviours';
import BaseComponent from './my-base-component';

const MyEnhancedComponent = compose([ behaviour1, behaviour2 ])(MyBaseComponent);
```

## Order

The order of the behaviours matter:
- All life cyle functions except `onUnmount` will be invoked in the order they are added (from left to right above)
- `onUnmount` handlers will be invoked in the reverse order behaviours are added (right to left)
- When at least one `shouldUpdate` handler is defined, it only needs one of them to return `true` for an update to proceed