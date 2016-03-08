import * as React from 'react';
import { reduce, collect, onConstruct, onMount, buildDisplayName, buildModel, pluckFunc } from './utils';

const compose = (behaviours) => {
    const get = pluckFunc(behaviours);
    const handlers = {
        getChildContext: get('getChildContext'),
        onMount: get('onMount'),
        shouldUpdate: get('shouldUpdate'),
        beforeUpdate: get('beforeUpdate'),
        afterUpdate: get('afterUpdate'),
        onReceiveProps: get('onReceiveProps')
    };

    return (BaseComponent) => {
        class Hocompose extends React.Component {
            constructor(props, context = {}) {
                super(props, context);
                this.context = context;
                const model = { props, context };

                const onConstructResults = onConstruct(behaviours, model);

                this.state = collect('state', onConstructResults);
                this.share = collect('share', onConstructResults);
            }

            getChildContext() {
                const getChildContextResults = handlers.getChildContext
                    .map(fn => fn(this.props));

                return reduce(getChildContextResults);
            }

            componentDidMount() {
                const model = buildModel(this);

                this.unmountHandlers = onMount(behaviours, model, this.setState, this.share);
            }

            componentWillUnmount() {
                const model = buildModel(this);

                this.unmountHandlers.reverse().forEach(onUnmount => onUnmount(model, this.share));
            }

            shouldComponentUpdate(nextProps, nextState) {
                if (handlers.shouldUpdate.length === 0) {
                    return true;
                }

                const model = buildModel(this, { nextProps, nextState });

                return handlers.shouldUpdate
                    .some(_ => _(model, this.share) === true);
            }

            componentWillReceiveProps(nextProps) {
                const model = buildModel(this, { nextProps });

                return handlers.onReceiveProps
                    .forEach(_ => _(model, this.setState, this.share));
            }

            componentWillUpdate(nextProps, nextState) {
                const model = buildModel(this, { nextProps, nextState });

                return handlers.beforeUpdate
                    .forEach(_ => _(model, this.share));
            }

            componentDidUpdate(prevProps, prevState) {
                const model = buildModel(this, { prevProps, prevState });

                return handlers.afterUpdate
                    .forEach(_ => _(model, this.setState, this.share));
            }

            render() {
                return React.createElement(BaseComponent, { ...this.props, ...this.state });
            }
        }

        Hocompose.displayName = buildDisplayName(behaviours, BaseComponent);
        Hocompose.contextTypes = collect('contextTypes', behaviours);
        Hocompose.childContextTypes = collect('childContextTypes', behaviours);

        return Hocompose;
    };
};

export default compose;
