import React, {Component} from 'react';

export default class TableTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            text: props.default || "",
            hasChanged: false
        }
    }

    textChange(event) {
        this.setState({
            text: event.target.value,
            hasChanged: true
        });
    }

    commitChange() {
        if (this.state.hasChanged) {
            if (this.props.commitAction) {
                this.props.commitAction(this.state.text);
            }
            this.setState({
                hasChanged: false
            });
        }
    }

    render() {
        const text = this.state.text;
        return (
            <input className="form-control" type="text" value={text || ""}
                   onChange={this.textChange.bind(this)}
                   onBlur={this.commitChange.bind(this)}/>
        );
    }

}