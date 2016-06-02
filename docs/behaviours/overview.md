# Overview

In __hocompose__, a behaviour is defined by one or more React life-cycle methods.

Behaviours can be defined as:
- A plain object
- A factory function (returning a plain object)

## Closures over context

All methods on hocompose behaviours are _thisless_, and hocompose enforces the use of closures rather than relying on context.

For example, __hocompose__ allows you to return an `componentWillUnmount` (_`componentWillUnmount`_) method from an `componentDidMount` (_`componentDidMount`_) method. It is very useful when subscribing to events or other data sources after a component was mounted, and then cleaning up any subscription before unmounting it.

## State as props

Quite often, one subscribes to data sources to be able to load data sideways. `state` is commonly leveraged to re-render components by marking a component node dirty. All state values will be passed down as properties.
