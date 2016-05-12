# API

__hocompose__ methods are named differently than the React ones to avoid any confusion, since their arguments are different (due to the absence of `this`).

## Factory function

A behaviour is a function returning an object defining its life cycle methods. It is being invoked when a component is instantiated, and is called with an initial model containing `props` and `context`.

| React | Hocompose | Model |
| -- | -- |
| `componentWillMount()` or class constructor | Factory function `fn(model)` | `props`, `context` |

## Life cycle methods and properties

A behaviour factory function can return an object defining life cycle methods and properties. Each method takes a `model` as first argument: model contains `props`, `state`, `context` and `refs` as a base.

| React | Hocompose | Model |
| -- | -- |
| `getInitialState()` | `state` property |  |
| `componentDidMount()` | `onMount(model, setState)` | `props`, `state, `refs`, `context` |
| `componentWillReceiveProps(nextProps)` | `onReceiveProps(model, setState)` | `props`, `nextProps`, `state`, `refs`, `context`
| `shouldComponentUpdate(nextProps, nextState)` | `shouldUpdate(model)` | `props`, `nextProps`, `state`, `nextState`, `refs`,  `context` |
| `componentWillUpdate(nextProps, nextState)` | `beforeUpdate(model)` | `props`, `nextProps`, `state`, `nextState`, `refs`, `context` |
| `componentDidUpdate(prevProps, prevState)` | `afterUpdate(model, setState)` | `props`, `prevProps`, `state`, `prevState`, `refs`, `context` |
| `getChildContext()` | `getChildContext(model)` | `props`, `state, `refs`, `context`

## Static methods and properties

Static methods and properties need to be set on the factory function itself.

| React | Hocompose |
| -- | -- |
| `childContextTypes` | `childContextTypes` |
| `defaultProps` | `defaultProps` |
| `propTypes` | `propTypes` |
| `contextTypes` | `contextTypes` |
| `displayName` | `name` ||