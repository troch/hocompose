# Event subscription

The following example listens to window re-size events. `width` and `height` will be passed down as properties.

The unsubscribing function returned by `componentDidMount` will be executed when unmounting.

```js
const windowResize = (model) => {
    const buildState = () => ({
        width: window.innerWidth,
        height: window.innerHeight
    });

    return {
        state: buildState(),
        componentDidMount(model, setState) {
            const resizeHandler = () => setState(buildState());
            
            window.addEventListener('resize', resizeHandler);

            // Return an unmount function
            return () => window.removeEventListener('resize', resizeHandler);
        }
    };
};
```
