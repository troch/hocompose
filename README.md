# hocompose

[![npm version](https://badge.fury.io/js/hocompose.svg)](https://badge.fury.io/js/hocompose)
[![Build Status](https://travis-ci.org/troch/hocompose.svg?branch=master)](https://travis-ci.org/troch/hocompose)

> A library to compose higher-order components into one.

__Note: 1.0.0 is a rewrite__

## Higher-order components

Using Higher-Order Components (HOCs) in React is great for composition. They allow to decouple rendering logic from life-cycle logic. HOCs are good for extracting logic from components, so it can be applied to other components without duplicating code.

Sharing a specific component behaviour between many components is easy with higher-order components. However, because of nesting, adding multiple behaviours to a component is done at the expense of component instances.


## Composition

Nesting rendering logic makes total sense, this is how one builds a UI consisting of a tree of components. But, why should one follow the same pattern to add a series of behaviours to a component?

This is what __hocompose__ enables: composing behaviours together in only one higher-order component. Think of it as the best of higher-order components, decorators and mixins.


## Installation

```sh
npm install --save hocompose
```

## Key concepts

- Only functions with closures, __hocompose__ is thisless
- State values are serialised to props
- `componentWillMount` functions can return `componentWillUnmount` functions

## Docs

* [Behaviours](docs/behaviours/index.md)
   * [Overview](docs/behaviours/overview.md)
   * [API](docs/behaviours/api.md)
   * [Composition](docs/behaviours/composition.md)
* [Examples](docs/examples/index.md)
   * [Event subscription](docs/examples/event-subscription.md)
   * [Event handlers](docs/examples/event-handlers.md)
   * [Redux store subscription](docs/examples/redux-store-subscription.md)
