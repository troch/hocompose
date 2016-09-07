# Event handlers

Defining event handlers in JSX is a common anti-pattern in React: on each render, it re-attaches event handlers to their corresponding DOM element.

The example below uses `state` to pass down event handlers as properties.

```js
import { React } from 'react';
import compose from 'hocompose';

const eventHandlersBehaviour = ({ props }) => ({
    state: {
        changeHandler: (evt) => props.setValue(evt.target.value)
    }
});

const Input = (props) => {
    return <input type='text' value={ props.value } onChange={ props.changeHandler } />;
}

export default compose(eventHandlersBehaviour)(Input);
```

This component would be used as follow:

```js
<Input value={ name } setValue={ setName } />
```
