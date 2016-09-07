# API

__hocompose__ methods are named differently than the React ones to avoid any confusion, since their arguments are different (due to the absence of `this`).

## Factory function

A behaviour is a function returning an object defining its life cycle methods. It is being invoked when a component is instantiated, and is called with an initial model containing `props` and `context`.

| React | Hocompose | Model |
| --- | --- | --- |
| class constructor | Factory function `fn(model)` | `props`, `context` |

## Life cycle methods and properties

A behaviour factory function can return an object defining life cycle methods and properties. Each method takes a `model` as first argument: model contains `props`, `state` and `context` as a base.

| React | Hocompose | Model |
| --- | --- | --- |
| `getInitialState()` | `state` property | |
| `componentWillMount()` | `componentWillMount(model, setState)` | `props`, `state`, `context` |
| `componentDidMount()` | `componentDidMount(model, setState)` | `props`, `state`, `context` |
| `componentWillReceiveProps(nextProps)` | `componentWillReceiveProps(model, setState)` | `props`, `nextProps`, `state`, `context` |
| `shouldComponentUpdate(nextProps, nextState)` | `shouldComponentUpdate(model)` | `props`, `nextProps`, `state`, `nextState`,  `context` |
| `componentWillUpdate(nextProps, nextState)` | `componentWillUpdate(model)` | `props`, `nextProps`, `state`, `nextState`, `context` |
| `componentDidUpdate(prevProps, prevState)` | `componentDidUpdate(model, setState)` | `props`, `prevProps`, `state`, `prevState`, `context` |
| `getChildContext()` | `getChildContext(model)` | `props`, `state`, `context` |

## Static methods and properties

Static methods and properties need to be set on the factory function itself.

| React | Hocompose |
| --- | --- |
| `childContextTypes` | `childContextTypes` |
| `defaultProps` | `defaultProps` |
| `propTypes` | `propTypes` |
| `contextTypes` | `contextTypes` |
| `displayName` | `name` |
