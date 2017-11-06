import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class TableFloatInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            number: props.default || 0.0,
            hasChanged: false
        }
    }

    numberChange(event) {
        this.setState({
            number: event.target.value,
            hasChanged: true
        });
    }

    commitChange() {
        if (this.state.hasChanged) {
            if (this.props.commitAction) {
                this.props.commitAction(this.state.number);
            }
            this.setState({
                hasChanged: false
            });
        }
    }

    render() {
        const number = this.state.number;
        return (
            <div className="input-group">
                <span className="input-group-addon">{this.props.unit || ""}</span>
                <input className="form-control" type="number" value={number || ""}
                       onChange={this.numberChange.bind(this)}
                       onBlur={this.commitChange.bind(this)}/>
            </div>
        );
    }

}