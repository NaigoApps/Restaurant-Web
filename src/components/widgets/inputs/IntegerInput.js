import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class IntegerInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            number: props.default || "",
            hasChanged: false
        }
    }

    numberChange(event) {
        this.setState({
            number: Math.floor(event.target.value),
            hasChanged: true
        });
    }

    commitChange() {
        if (this.state.hasChanged) {
            console.log(this.state.number);
            if (this.props.commitAction) {
                this.props.commitAction(this.state.number);
            }
            this.setState({
                hasChanged: false
            });
        }
    }

    render() {
        const label = this.props.label;
        const number = this.state.number;
        const field = (
            <input className="form-control" type="text" value={number}
                   onChange={this.numberChange.bind(this)}
                   onBlur={this.commitChange.bind(this)}/>
        );
        return field;
    }

}