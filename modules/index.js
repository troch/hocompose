import * as React from 'react';
import { collect, onConstruct, onMount, buildDisplayName, buildModel, isFunc } from './utils';

const hocompose = (behaviours) => (BaseComponent) => {
    class Hocompose extends React.Component {
        constructor(props, context = {}) {
            super(props, context);
            this.context = context;
            const model = { props, context };
            this.state = collect('state', onConstruct(behaviours, model));
        }

        getChildContext() {
            const getChildContextResults = behaviours
                .filter(behaviours => isFunc(behaviours.getChildContext))
                .map(behaviours => ({ getChildContext: behaviours.getChildContext(this.props) }))

            return collect('getChildContext', getChildContextResults);
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
            const shouldUpdateHandlers = behaviours
                .filter(_ => isFunc(_.shouldUpdate));

            if (shouldUpdateHandlers.length === 0) {
                return true;
            } else {
                const model = {
                    props: this.props,
                    state: this.state,
                    nextProps,
                    nextState
                };

                return shouldUpdateHandlers
                    .map(_ => _(model))
                    .some(_ => _ === true);
            }
        }

        componentDidUpdate(nextProps) {
            const model = {
                props: this.props,
                state: this.state,
                context: this.context,
                nextProps
            };

            return behaviours
                .filter(_ => isFunc(_.onUpdate))
                .forEach(_ => _(model, this.setState));
        }

        render() {
            const stateToProps = Object.keys(this.state)
                .filter(key => !/^_/.test(key))
                .reduce((acc, key) => ({ ...acc, [key]: this.state[key] }), {});

            return React.createElement(BaseComponent, { ...this.props, ...stateToProps });
        }
    }

    Hocompose.displayName = buildDisplayName(behaviours, BaseComponent);
    Hocompose.contextTypes = collect('contextTypes', behaviours);
    Hocompose.childContextTypes = collect('childContextTypes', behaviours);

    return Hocompose;
};

export default hocompose;
