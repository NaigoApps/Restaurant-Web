import React, {Component} from 'react';
import eveningSelectionFormActions from "./EveningSelectorActions";
import Calendar from "../../../widgets/Calendar";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";


const TABLES_VIEW = "TABLES_VIEW";
const TABLE_CREATION = "TABLE_CREATION";

export default class EveningSelector extends Component {
    constructor(props) {
        super(props);
    }

    onSelectEvening(date) {
        eveningSelectionFormActions.chooseEvening(date);
    }

    render() {
        return (
            <Row topSpaced>
                <Column>
                    <Calendar
                        data={this.props.data}
                        monthActionsProvider={eveningSelectionFormActions}
                        yearActionsProvider={eveningSelectionFormActions}
                        commitAction={this.onSelectEvening.bind(this)}/>
                </Column>
            </Row>
        );
    }
}