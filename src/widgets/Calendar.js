import React, {Component} from 'react';
import {isThisMonth, isToday} from "../components/widgets/inputs/DateInput";
import Row from "./Row";
import Column from "./Column";
import CalendarButton from "./CalendarButton";
import {distribute, iGet} from "../utils/Utils";
import SelectEditor from "../components/widgets/inputs/SelectEditor";
import IntegerEditor from "../components/widgets/inputs/IntegerEditor";
import EveningSelectorActions from "../pages/eveningEditing/eveningSelection/EveningSelectorActions";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

const MONTHS = [
    "Gennaio", "Febbraio", "Marzo", "Aprile",
    "Maggio", "Giugno", "Luglio", "Agosto",
    "Settembre", "Ottobre", "Novembre", "Dicembre"
];

export default class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    clickAction(date) {
        if (this.props.commitAction) {
            this.props.commitAction(date);
        }
    }

    monthName(number) {
        return MONTHS[number];
    }

    render() {
        let day = 1;
        let data = this.props;
        let month = data.month;
        let year = data.year;
        let current = new Date(year, month, day);

        while (current.getDay() !== 1) {
            current.setDate(current.getDate() - 1);
        }

        let dates = [];

        while (current.getMonth() !== month) {
            dates.push(current);
            current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
        }

        while (current.getMonth() === month) {
            dates.push(current);
            current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
        }

        while (current.getDay() !== 1) {
            dates.push(current);
            current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
        }

        let rows = distribute(dates, 7);

        return (
            <Row>
                <Column>
                    <Row>
                        <Column>
                            <SelectEditor
                                options={{
                                    label: 'Mese',
                                    rows: 4,
                                    cols: 3,
                                    id: value => MONTHS.indexOf(value),
                                    values: MONTHS,
                                    value: month,
                                    callback: result => this.props.confirmMonth(result)
                                }}
                            />
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <IntegerEditor
                                options={{
                                    label: 'Anno',
                                    value: year,
                                    min: 1999,
                                    max: 2100,
                                    callback: result => this.props.confirmYear(result)
                                }}
                            />
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            {rows.map((row, index) => {
                                return <Row key={index} topSpaced>
                                    {row.map(date => <Column key={date.getTime()}>
                                        <CalendarButton
                                            active={isToday(date)}
                                            date={date}
                                            commitAction={this.clickAction.bind(this)}
                                            disabled={!isThisMonth(date)}
                                        />
                                    </Column>)}
                                </Row>;
                            })}
                        </Column>
                    </Row>
                </Column>
            </Row>
        );
    }

}