# Why hocompose?

Hocompose is a tiny library 

## Higher-order components

Using Higher-Order Components (HOCs) in React is great for composition: they allow to decouple rendering logic from lifecycle logic.

HOCs are very good for extracting any component logic which is not part of its rendering, and share it with different components, without repeating code. However, if sharing a specific component behaviour between many components is easy with HOCs, adding multiple behaviours to a component is done at the expense of new component instances because of nesting.

## 

Nesting rendering logic makes total sense, this is how one builds a UI. But, why should one follow the same pattern to apply a list of behaviours to a component? Adding component instances 



__hocompose__ allows you to compose behaviours together in only one higher-order component. Think of it as the best of higher-order components, decorators and mixins.