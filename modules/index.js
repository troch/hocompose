import React from 'react';
import {
    reduce,
    collect,
    componentMounting,
    buildDisplayName,
    buildModel,
    pluckFunc,
    resolveBehaviours
} from './utils';

const createHoc = (...args) => (BaseComponent) => {
    const behaviours = Array.isArray(args[0]) ? args[0] : args;
    let resolvedBehaviours;

    class Hocompose extends React.Component {
        constructor(props, context = {}) {
            super(props, context);
            this.context = context;
            const model = { props, context };

            resolvedBehaviours = resolveBehaviours(behaviours, model);

            const get = pluckFunc(resolvedBehaviours);
            this.handlers = {
                getChildContext: get('getChildContext'),
                shouldComponentUpdate: get('shouldComponentUpdate'),
                componentWillUpdate: get('componentWillUpdate'),
                componentDidUpdate: get('componentDidUpdate'),
                componentWillReceiveProps: get('componentWillReceiveProps')
            };
            this.state = collect('state', resolvedBehaviours);
        }

        getChildContext() {
            const model = buildModel(this);

            const getChildContextResults = this.handlers.getChildContext
                .map(_ => _(model));

            return reduce(getChildContextResults);
        }

        componentDidMount() {
            const model = buildModel(this);

            this.unmountHandlers = componentMounting(resolvedBehaviours, model, this.setState);
        }

        componentWillUnmount() {
            const model = buildModel(this);

            this.unmountHandlers.reverse().forEach(_ => _(model));
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (this.handlers.shouldComponentUpdate.length === 0) {
                return true;
            }

            const model = buildModel(this, { nextProps, nextState });

            return this.handlers.shouldComponentUpdate
                .some(_ => _(model) === true);
        }

        componentWillReceiveProps(nextProps) {
            const model = buildModel(this, { nextProps });

            return this.handlers.componentWillReceiveProps
                .forEach(_ => _(model, this.setState));
        }

        componentWillUpdate(nextProps, nextState) {
            const model = buildModel(this, { nextProps, nextState });

            return this.handlers.componentWillUpdate
                .forEach(_ => _(model));
        }

        componentDidUpdate(prevProps, prevState) {
            const model = buildModel(this, { prevProps, prevState });

            return this.handlers.componentDidUpdate
                .forEach(_ => _(model, this.setState));
        }

        render() {
            return React.createElement(BaseComponent, { ...this.props, ...this.state });
        }
    }

    Hocompose.displayName = buildDisplayName(behaviours, BaseComponent);
    Hocompose.contextTypes = collect('contextTypes', behaviours);
    Hocompose.childContextTypes = collect('childContextTypes', behaviours);
    Hocompose.defaultProps = collect('defaultProps', behaviours.concat(BaseComponent));
    Hocompose.propTypes = collect('propTypes', behaviours.concat(BaseComponent));

    return Hocompose;
};

export default createHoc;
