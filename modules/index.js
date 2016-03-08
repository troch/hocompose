import * as React from 'react';
import { collect, onConstruct, onMount, buildDisplayName, makeModel } from './utils';

const hocompose = (behaviours) => (BaseComponent) => {
    class Hocompose extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.context = context;
            const model = { props, context };
            this.state = collect('state', onConstruct(behaviours, model));
        }

        componentDidMount() {
            const model = makeModel(this);
            this.unmountHandlers = onMount(model, this.setState);
        }

        componentWillUnmount() {
            const model = makeMode(this);
            this.unmountHandlers.reverse().forEach(onUnmount => onUnmount(model));
        }

        shouldComponentUpdate(nextProps, nextState) {
            const model = {
                props: this.props,
                state: this.state,
                nextProps,
                nextState
            };

            return behaviours
                .filter(_ => isFunc(_.shouldUpdate))
                .map(_ => _(model))
                .some(_ => _ === true);
        }

        componentWillUpdate(nextProps) {
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
                .filter(!/^_/.test)
                .map(key => this.state[key]);

            return React.createElement(BaseComponent, { ...this.props, ...stateToProps });
        }
    }

    Hocompose.displayName = buildDisplayName(behaviours);
    Hocompose.contextTypes = collect('contextTypes', behaviours);
    Hocompose.childContextTypes = collect('childContextTypes', behaviours);

    return Hocompose;
};

export default hocompose;
