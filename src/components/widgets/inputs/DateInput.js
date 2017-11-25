import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export function formatDate(date) {
    let formattedDate = new Date(date);
    formattedDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return formattedDate.toJSON().slice(0, 10);
}

export function beautifyDate(date) {
    if (date) {
        return date.substr(8, 2) + "/" + date.substr(5, 2) + "/" + date.substr(0, 4);
    }
    return "";
}

export function beautifyTime(date) {
    if (date) {
        return date.substr(date.indexOf("T") + 1, 5);
    }
    return "";
}

export default class
DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        if (props.default) {
            return {
                date: props.default
            }
        } else {
            return {
                date: formatDate(new Date())
            }
        }
    }

    componentDidMount() {
        this.props.commitAction(this.state.date);
    }


    dateChange(event) {
        this.setState({
            date: event.target.value
        });
        this.props.commitAction(event.target.value);
    }

    render() {
        const label = this.props.label;
        const date = this.state.date;
        const field = <input className="form-control" type="date" value={date || ""}
                             onChange={this.dateChange.bind(this)}/>;
        return field;
    }

}