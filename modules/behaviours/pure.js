const shallowEquals = (left, right) =>
    Object.keys(left).length === Object.keys(right).length &&
    Object.keys(left).every(leftKey => left[leftKey] === right[rightKey]);

const pure = {
    name: 'pure',

    shouldComponentUpdate(model) {
        const { props, nextProps, state, nextState } = model;

        return !shallowEquals(props, nextProps) || !shallowEquals(state, nextState);
    }
};

export default pure;
