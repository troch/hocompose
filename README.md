# hocompose

> A library to compose higher-order components into one.

---
__Not published yet, I'm still thinking about the API__
---

Using Higher-Order Components in React is great for composition: they allow to decouple rendering logic from lifecycle logic.

However, you can quickly pile them up and they can slow down your application by multiplying the number of React component instances your application has to handle.

__hocompose__ allows you to compose behaviours together in only one higher-order component. Think of it as the best of higher-order components, decorators and mixins.

__hocompose__ is thisless.

## Installation

```sh
npm install --save hocompose
```

## Behaviours

__hocompose__ exports a default function to create a new higher-order component and apply it to a base component.

```js
import createHoc from 'hocompose';

createHoc([ behaviour1, behaviour2, ... ])(BaseComponent);
```

`createHoc` accepts an array of behaviours. __behaviours__ are simple plain JavaScript objects containing properties and lifecycle methods.

Three behaviours are available


## API

#### `onConstruct: (model: Object) => ?Object`

`onConstruct` is equivalent to constructors of ES6 classes or `componentWillMount` lifecycle method. You can optionally return a plain object containing a `state` and `share` property. If supplied, the `state` object will be your initial state. `share` is an object which will be passed around other lifecycle methods and that you can freely mutate if you wish to.

```js
const myBehaviour = {
    onConstruct(model) {
        return {
            state: {
                count: 0
            },
            share: {
                cache: {}
            }
        }
    }
};
```

State properties will be injected alongside props to your base component.

#### `onMount: (model: Object, setState: Function, share: Object) => ?Function`

`onMount` will be invoked when a component did mount. `model` contains `props`, `state` and `context` properties. Mounting functions are called in the order the behaviours are declared, and they can return an `onUnmount` function. Unmounting functions will be invoked in the reverse order.

#### `onUmount: (model: Object, share: Object)`

_`componentWillUnmount`_: `model` contains `props`, `state` and `context` properties. Unmounting functions are invoked in the reverse order behaviours are declared. Unmounting functions can be defined in a behaviour, or returned by an `onMount` handler. If both, the handler returned by `onMount` will be used.

Being able to return an unmounting handler is perfect for components which need to set-up things and then clean them up when being unmounted (like subscriptions to a store, a stream, an event...).

#### `shouldUpdate: (model: Object, share: Object)`

_`componentShouldUpdate`_: `model` contains `props`, `state`, `context`, `nextProps`, `nextState` properties, and `shouldUpdate` functions should return true or false. If no behaviours implements a `shouldUpdate` method, updates will always proceed by default. If one behaviour or more implements `shouldUpdate`, updates will proceed if at least one of them returns `true`.

#### `onReceiveProps: (model: Object, setState: Function, share: Object)`

_`componentWillReveiveProps`_: `model` contains `props`, `state`, `context`, `nextProps`, `nextState` properties.

#### `beforeUpdate: (model: Object, share: Object)`

_`componentWillUpdate`_: `model` contains `props`, `state`, `context`, `nextProps`, `nextState` properties.

#### `afterUpdate: (model: Object, setState: Function, share: Object)`

_`componentDidUpdate`_: `model` contains `props`, `state`, `context`, `prevProps`, `prevState` properties.

#### `childContextTypes: Object`

Exactly like `childContextTypes`.

#### `getChildContext(props: Object): Function`

Exactly like `getChildContext`.

#### `contextTypes`

Exactly like `contextTypes`.

#### `name: String`

A behaviour's name which will be used in the `displayName` of a created higher-order component.
