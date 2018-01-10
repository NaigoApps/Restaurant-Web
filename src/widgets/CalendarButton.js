import React, {Component} from 'react';
import Icon from "./Icon";
import DateInput, {daysInMonth, formatDate} from "../components/widgets/inputs/DateInput";
import Button from "./Button";
import GridButton from "./GridButton";

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
            <GridButton
                active={this.props.active}
                text={this.props.date.getDate() + "/" + (this.props.date.getMonth() + 1)}
                commitAction={this.props.commitAction.bind(this, formatDate(this.props.date))}
            />
        );
    }

}