# hocompose

> A library to compose higher-order components into one.

Using Higher-Order Components in React is great for composition: they allow to decouple rendering logic from lifecycle logic.

However, you can quickly pile them up and they _could_ have an impact on your application performance by multiplying the number of React component instances your application has to create and handle. I used the word _could_ because I don't have any figure or benchmark to back that claim. It was mentioned in a video that it was a concern for Netflix (missing ref).

Whether or not too many higher-order components are bad for performance, why should we create a component instance for each additional behaviour we want to add to a component? Nested rendering logic makes sense, but nesting behaviours not always.

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

`createHoc` accepts an array of behaviours. __behaviours__ are functions or simple plain JavaScript objects containing properties and lifecycle methods.

Three behaviours are available: `setContext`, `getContext` and `pure`.

```js
import { setContext, getContext, pure } from 'hocompose';
```


## Examples of behaviours

```js
// Behaviour as a function
const windowResize = (model) => {
    const buildState = () => ({
        width: window.innerWidth,
        height: window.innerHeight
    });


    // Because this will be returned when a component is instanciated,
    // properties like contextTypes, childrenContextTypes, etc... will be ignored
    return {
        state: buildState(),
        onMount(model, setState) {
            const resizeHandler = () => setState(buildState());

            window.addEventListener('resize', resizeHandler);

            // Return an unmount function
            return () => window.removeEventListener('resize', resizeHandler);
        }
    };
};
```

```js
// Behaviour as a plain object
const windowResize = {
    state: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    onMount(model, setState) {
        const resizeHandler = () => setState({
            width: window.innerWidth,
            height: window.innerHeight
        });

        window.addEventListener('resize', resizeHandler);

        // Return an unmount function
        return () => window.removeEventListener('resize', resizeHandler);
    }
};

```

## API

Behaviours can be plain objects or functions. If a function is supplied, it will treated as an `componentWillMount` method (or ES6 class constructor). It can return an object with lifecycle methods and an initial state (factory).


#### `behaviour: (model: Object) => Object`

When using a factory function, it will receive a `model` object containing `props` and `context` properties. It should return an object with at least one of the following methods and properties

```js
const myBehaviour = (model) => {
    const { props } = model;

    return {
        state: {
            count: props.initialCount
        }
    }
};
```

State properties will be serialised to props and passed to your base component.

#### `onMount: (model: Object, setState: Function) => ?Function`

`onMount` will be invoked when a component did mount. `model` contains `props`, `state` and `context` properties. Mounting functions are called in the order the behaviours are declared, and they can return an `onUnmount` function. Unmounting functions will be invoked in the reverse order.

#### `onUmount: (model: Object)`

_componentWillUnmount_: `model` contains `props`, `state`, `refs` and `context` properties. Unmounting functions are invoked in the reverse order behaviours are declared. Unmounting functions can be defined in a behaviour, or returned by an `onMount` handler. If both, the handler returned by `onMount` will be used.

Being able to return an unmounting handler is perfect for components which need to set-up things and then clean them up when being unmounted (like subscriptions to a store, a stream, an event...).

#### `shouldUpdate: (model: Object)`

_componentShouldUpdate_: `model` contains `props`, `state`, `refs`, `context`, `nextProps`, `nextState` properties, and `shouldUpdate` functions should return true or false. If no behaviours implements a `shouldUpdate` method, updates will always proceed by default. If one behaviour or more implements `shouldUpdate`, updates will proceed if at least one of them returns `true`.

#### `onReceiveProps: (model: Object, setState: Function)`

_componentWillReveiveProps_: `model` contains `props`, `state`, `refs`, `context`, `nextProps`, `nextState` properties.

#### `beforeUpdate: (model: Object)`

_componentWillUpdate_: `model` contains `props`, `state`, `refs`, `context`, `nextProps`, `nextState` properties.

#### `afterUpdate: (model: Object, setState: Function)`

_componentDidUpdate_: `model` contains `props`, `state`, `refs`, `context`, `prevProps`, `prevState` properties.

#### `state: Object`

An initial state object. If an `onConstruct` method returns an object with a `state` property, it will be used rather than the initial state specified on the behaviour itself. 

#### `childContextTypes: Object`

Exactly like `childContextTypes`.

#### `getChildContext(props: Object): Function`

Exactly like `getChildContext`.

#### `contextTypes: Object`

Exactly like `contextTypes`.

#### `propTypes: Object`

Exactly like `propTypes`. Prop types from the supplied base component will be hoisted to the created higher-order component.

#### `defaultProps: Object`

Exactly like `defaultProps` (not like `getDefaultProps`). Default prop types defined by the supplied base component will be hoisted to the created higher-order component.

#### `name: String`

A behaviour's name which will be used in the `displayName` of a created higher-order component.
