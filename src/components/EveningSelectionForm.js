import React, {Component} from 'react';
import DateInput from "./widgets/inputs/DateInput";
import Button from "../widgets/Button";
import eveningSelectionFormActions from "../actions/pages/EveningSelectionFormActions";

const TABLES_VIEW = "TABLES_VIEW";
const TABLE_CREATION = "TABLE_CREATION";

export default class EveningSelectionForm extends Component {
    constructor(props) {
        super(props);
    }

    onDateChange(date) {
        eveningSelectionFormActions.updateEveningDate(date);
    }

    onSelectEvening() {
        eveningSelectionFormActions.chooseEvening(this.props.eveningDate);
    }

    render() {
        const date = this.props.eveningDate;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="form-inline text-center">
                            <DateInput
                                label="Selezione serata"
                                commitAction={this.onDateChange.bind(this)}
                                default={date}/>

                            <Button
                                icon="play"
                                commitAction={this.onSelectEvening.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}