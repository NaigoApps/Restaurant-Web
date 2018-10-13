import React, {Component} from 'react';
import DateInput, {daysInMonth, formatDate, normalizeDate} from "../components/widgets/inputs/DateInput";
import Button from "./Button";
import TextButton from "./TextButton";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class CalendarButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextButton
                disabled={this.props.disabled}
                active={this.props.active}
                text={this.props.date.getDate() + "/" + (this.props.date.getMonth() + 1)}
                commitAction={this.props.commitAction.bind(this, normalizeDate(this.props.date))}
            />
        );
    }

}