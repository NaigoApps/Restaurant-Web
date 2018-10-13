import React from 'react';
import eveningSelectorStore from "./EveningSelectorStore";
import ViewController from "../../../widgets/ViewController";
import Page from "../../Page";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import EveningSelectorActions from "./EveningSelectorActions";
import Calendar from "../../../widgets/Calendar";

export default class EveningSelectionPage extends ViewController {
    constructor(props) {
        super(props, eveningSelectorStore);
    }

    render() {
        return (
            <Page title="Selezione serata" {...this.state.general}>
                <Row topSpaced grow>
                    <Column>
                        <Calendar
                            month={this.state.month}
                            year={this.state.year}
                            confirmMonth={month => EveningSelectorActions.confirmMonth(month)}
                            confirmYear={year => EveningSelectorActions.confirmYear(year)}
                            commitAction={date => EveningSelectorActions.chooseEvening(date)}/>
                    </Column>
                </Row>
            </Page>
        );
    }
}