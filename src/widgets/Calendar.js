import React, {Component} from 'react';
import Icon from "./Icon";
import {isThisMonth, isToday} from "../components/widgets/inputs/DateInput";
import Row from "./Row";
import Column from "./Column";
import CalendarButton from "./CalendarButton";
import {distribute, iGet} from "../utils/Utils";
import SelectEditor from "../components/widgets/inputs/SelectEditor";
import IntegerEditor from "../components/widgets/inputs/IntegerEditor";
import eveningSelectionFormActions from "../actions/pages/EveningSelectionFormActions";

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
        let monthActionsProvider = this.props.monthActionsProvider;
        let yearActionsProvider = this.props.yearActionsProvider;
        let day = 1;
        let data = this.props.data;
        let month = data.get('month');
        let year = data.get('year');
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
                                rows={4}
                                cols={3}
                                label="Mese"
                                page={0}
                                visible={iGet(data, "monthEditor.visible")}
                                id={value => MONTHS.indexOf(value)}
                                options={MONTHS}
                                value={iGet(data, "monthEditor.value")}
                                onSelect={value => monthActionsProvider.onSelectMonth(value)}
                                onDeselect={value => monthActionsProvider.onSelectMonth(null)}
                                onShowModal={() => monthActionsProvider.onStartMonthEditing()}

                                onAbort={monthActionsProvider.onAbortMonthEditing}
                                onConfirm={result => monthActionsProvider.onConfirmMonthEditing(result)}
                            />
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <IntegerEditor
                                uuid="calendar_year"
                                label="Anno"
                                visible={iGet(data, "yearEditor.visible")}
                                text={iGet(data, "yearEditor.text")}
                                onShowModal={() => yearActionsProvider.onStartDayEditing()}
                                onChar={char => yearActionsProvider.onDayChar(char)}

                                onConfirm={result => yearActionsProvider.onConfirmDayEditing(result)}
                                onAbort={yearActionsProvider.onAbortDayEditing}
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