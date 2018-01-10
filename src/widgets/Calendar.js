import React, {Component} from 'react';
import Icon from "./Icon";
import {isToday} from "../components/widgets/inputs/DateInput";
import Row from "./Row";
import Column from "./Column";
import CalendarButton from "./CalendarButton";
import {distribute} from "../utils/Utils";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    clickAction(date) {
        if (this.props.commitAction) {
            this.props.commitAction(date);
        }
    }

    render() {
        let text = this.props.text;
        let glyphicon;
        if (this.props.icon) {
            glyphicon = <Icon name={this.props.icon}/>;
        }

        let today = new Date();

        let month = today.getMonth();

        while (today.getDate() !== 1) {
            today.setDate(today.getDate() - 1);
        }

        while (today.getDay() !== 0) {
            today.setDate(today.getDate() - 1);
        }

        let dates = [];

        while (today.getMonth() !== month) {
            dates.push(today);
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        }

        while (today.getMonth() === month) {
            dates.push(today);
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        }

        while (today.getDay() !== 0) {
            dates.push(today);
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        }

        let rows = distribute(dates, 7);

        return (
            <Row>
                <Column>
                    {rows.map((row, index) => {
                        return <Row key={index}>
                            {row.map(date => <Column key={date.getTime()} active={isToday(date)} bordered>
                                <CalendarButton
                                    date={date}
                                    commitAction={this.clickAction.bind(this)}
                                />
                            </Column>)}
                        </Row>;
                    })}
                </Column>
            </Row>
        );
    }

}