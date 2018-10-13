import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export function isToday(date){
    let now = new Date();
    return date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
}

export function isThisMonth(date){
    return true;
    // let now = new Date();
    // return date.getMonth() === now.getMonth() &&
    //     date.getFullYear() === now.getFullYear();
}

export function daysInMonth(month, year){
    return new Date(year, month + 1, 0).getDate();
}

export function formatDate(date) {
    let formattedDate = new Date(date);
    formattedDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return beautifyDate(formattedDate.toJSON().slice(0, 10));
}

export function formatTime(date) {
    let formattedDate = new Date(date);
    formattedDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return beautifyTime(formattedDate.toJSON());
}

export function normalizeDate(date) {
    let formattedDate = new Date(date);
    formattedDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return standardizeDate(formattedDate.toJSON().slice(0, 10));
}

export function beautifyDate(strDate) {
    if (strDate) {
        return strDate.substr(8, 2) + "/" + strDate.substr(5, 2) + "/" + strDate.substr(0, 4);
    }
    return "";
}

export function standardizeDate(strDate) {
    if (strDate) {
        return strDate.substr(0, 4) + "-" + strDate.substr(5, 2) + "-" + strDate.substr(8, 2);
    }
    return "";
}

export function beautifyTime(strDate) {
    if (strDate) {
        return strDate.substr(strDate.indexOf("T") + 1, 5);
    }
    return "";
}

export default class DateInput extends Component {
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