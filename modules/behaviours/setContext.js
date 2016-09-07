const setContext = (types, values) => ({
    name: 'setContext',

    childContextTypes: types,

    getChildContext(props) {
        if (typeof values === 'function') {
            return values(props);
        }

        return values;
    }
});

export default setContext;
