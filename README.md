# hocompose

> A library to compose higher-order components into one. 

Using Higher-Order Components in React is great for composition: they allow to decouple rendering logic from lifecycle logic.

However, you can quickly pile them up and they can slow down your application by multiplying the number of React component instances your application has to handle.

__hocompose__ allows you to compose behaviours together in only one higher-order component. Think of it as the best of both worlds between higher-order components and mixins.

__hocompose__ is thisless.

## Installation

```sh
npm install --save hocompose
```

## Behaviours

__hocompose__ exports one single function to create a new higher-order component and apply it to a base component.

```js
import createHoc from 'hocompose';

createHoc([ behaviour1, behaviour2, ... ])(BaseComponent);
```

`createHoc` accepts an array of behaviours. __behaviours__ are simple plain JavaScript objects containing properties and lifecycle methods

#### `onConstruct: (props: Object, context: Object) => ?Object`

The signature of `onConstruct` is the same than the constructor of an ES6 class. You can return a plain object and it will be your initial state. State properties will be injected alongside props to your base component, unless their name starts with an underscore (`_`, denotes a state value is private).

#### `onMount: (model: Object, setState: Function) => ?Function`

`onMount` will be invoked when a component did mount. `model` contains `props`, `state` and `context` properties. Mounting functions are called in the order the behaviours are declared, and they can return an `onUnmount` function. Unmounting functions will be invoked in the reverse order. 

#### `shouldUpdate: (model: Object)`

`model` contains `props`, `state`, `context`, `nextProps`, `nextState` properties, and `shouldUpdate` functions should return true or false. If no behaviours implements a `shouldUpdate` method, updates will always proceed. If one behaviour or more implements `shouldUpdate`, updates will proceed if at least one of them returns `true`.

#### `onUpdate: (model: Object, setState: Function)`

Equivalent to `componentDidUpdate`. `model` contains `props`, `state` and `context` properties.

#### `onUmount: (model: Object)`

Equivalent to `componentWillUnmount`. `model` contains `props`, `state` and `context` properties. Unmounting functions are invoked in the reverse order behaviours are declared. Unmounting functions can be defined in a behaviour, or returned by an `onMount` handler. If both, the handler returned by `onMount` will be used.

#### `childContextTypes: Object`

Exactly like `childContextTypes`.

#### `getChildContext: Function`

Exactly like `getChildContext`.

#### `contextTypes`

Exactly like `contextTypes`.

#### `name: String`

A behaviour's name which will be used in the `displayName` of a created higher-order component.
