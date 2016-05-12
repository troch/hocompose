import * as React from 'react';
import { reduce, collect, onMount, buildDisplayName, buildModel, pluckFunc, resolveBehaviours } from './utils';

const compose = (behaviours) => (BaseComponent) => {
    class Hocompose extends React.Component {
        constructor(props, context = {}) {
            super(props, context);
            this.context = context;
            const model = { props, context };

            const resolvedBehaviours = resolveBehaviours(behaviours, model);

            const get = pluckFunc(resolvedBehaviours);
            this.handlers = {
                getChildContext: get('getChildContext'),
                onMount: get('onMount'),
                shouldUpdate: get('shouldUpdate'),
                beforeUpdate: get('beforeUpdate'),
                afterUpdate: get('afterUpdate'),
                onReceiveProps: get('onReceiveProps')
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

            this.unmountHandlers = onMount(behaviours, model, this.setState);
        }

        componentWillUnmount() {
            const model = buildModel(this);

            this.unmountHandlers.reverse().forEach(onUnmount => onUnmount(model));
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (this.handlers.shouldUpdate.length === 0) {
                return true;
            }

            const model = buildModel(this, { nextProps, nextState });

            return this.handlers.shouldUpdate
                .some(_ => _(model) === true);
        }

        componentWillReceiveProps(nextProps) {
            const model = buildModel(this, { nextProps });

            return this.handlers.onReceiveProps
                .forEach(_ => _(model, this.setState));
        }

        componentWillUpdate(nextProps, nextState) {
            const model = buildModel(this, { nextProps, nextState });

            return this.handlers.beforeUpdate
                .forEach(_ => _(model));
        }

        componentDidUpdate(prevProps, prevState) {
            const model = buildModel(this, { prevProps, prevState });

            return this.handlers.afterUpdate
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

export default compose;
