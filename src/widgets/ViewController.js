import {Component} from "react";

export default class ViewController extends Component{

    constructor(props, ...stores) {
        super(props);
        this.stores = stores;
        this.state = {};
        this.stores.forEach(store => this.state = {...this.state, ...store.getState()});

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.stores.forEach(store => store.addChangeListener(this.updateState));
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        this.stores.forEach(store => store.removeChangeListener(this.updateState));
    }
}