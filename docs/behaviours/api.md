# API

__hocompose__ methods are named differently than the React ones to avoid any confusion, since their arguments are different (due to the absence of context).

## Methods

| React | Hocompose | Model |
| -- | -- |
| `componentWillMount()` / class constructor | Factory function `fn(model)` | `props`, `context` |
| `getInitialState()` | Factory function returning an object with a `state` property |  |
| `componentDidMount()` | `onMount(model, setState)` | `props`, `state, `context` |
| `componentWillReceiveProps(nextProps)` | `onReceiveProps(model, setState)` | `props`, `nextProps`, `state`, `context`
| `shouldComponentUpdate(nextProps, nextState)` | `shouldUpdate(model)` | `props`, `nextProps`, `state`, `nextState`,  `context` |
| `componentWillUpdate(nextProps, nextState)` | `beforeUpdate(model)` | `props`, `nextProps`, `state`, `nextState`, `context` |
| `componentDidUpdate(prevProps, prevState)` | `afterUpdate` | `props`, `prevProps`, `state`, `prevState`, `context` |
| `getChildContext()` | `getChildContext(model)` | `props`, `state`, `context` |

## Properties

| React | Hocompose |
| -- | -- |
| `childContextTypes` | `childContextTypes` |
| `defaultProps` | `defaultProps` |
| `propTypes` | `propTypes` |
| `contextTypes` | `contextTypes` |
| `displayName` | `name` |