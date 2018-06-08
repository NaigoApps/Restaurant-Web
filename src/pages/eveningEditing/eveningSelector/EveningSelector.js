import React, {Component} from 'react';
import {EveningSelectorActions} from "./EveningSelectorActions";
import Calendar from "../../../widgets/Calendar";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";


const TABLES_VIEW = "TABLES_VIEW";
const TABLE_CREATION = "TABLE_CREATION";

export default class EveningSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row topSpaced>
                <Column>
                    <Calendar
                        data={this.props.data}
                        monthActionsProvider={EveningSelectorActions}
                        yearActionsProvider={EveningSelectorActions}
                        commitAction={date => EveningSelectorActions.chooseEvening(date)}/>
                </Column>
            </Row>
        );
    }
}