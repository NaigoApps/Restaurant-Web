import {Component} from "react";

export default class ViewController extends Component{

    constructor(props, store) {
        super(props);
        this.store = store;
        this.state = this.store.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.store.addChangeListener(this.updateState);
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        this.store.removeChangeListener(this.updateState);
    }
}