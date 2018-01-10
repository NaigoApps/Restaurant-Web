import React, {Component} from 'react';
import DateInput from "./widgets/inputs/DateInput";
import Button from "../widgets/Button";
import eveningSelectionFormActions from "../actions/pages/EveningSelectionFormActions";
import Calendar from "../widgets/Calendar";

const TABLES_VIEW = "TABLES_VIEW";
const TABLE_CREATION = "TABLE_CREATION";

export default class EveningSelectionForm extends Component {
    constructor(props) {
        super(props);
    }

    onSelectEvening(date) {
        eveningSelectionFormActions.chooseEvening(date);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <Calendar commitAction={this.onSelectEvening.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}