import React from 'react';
import eveningSelectorStore from "./EveningSelectorStore";
import ViewController from "../../../widgets/ViewController";
import Page from "../../Page";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import EveningSelectorActions from "./EveningSelectorActions";
import Calendar from "../../../widgets/Calendar";
import applicationStore from "../../../stores/ApplicationStore";
import loadingStore from "../../../stores/LoadingStore";
import errorsStore from "../../../stores/ErrorsStore";

export default class EveningSelectionPage extends ViewController {
    constructor(props) {
        super(props, eveningSelectorStore);
    }

    render() {
        const data = this.state.eveningSelection;
        return (
            <Page title="Selezione serata">
                <Row topSpaced grow>
                    <Column>
                        <Calendar
                            month={data.month}
                            year={data.year}
                            confirmMonth={month => EveningSelectorActions.confirmMonth(month)}
                            confirmYear={year => EveningSelectorActions.confirmYear(year)}
                            commitAction={date => EveningSelectorActions.chooseEvening(date)}/>
                    </Column>
                </Row>
            </Page>
        );
    }
}