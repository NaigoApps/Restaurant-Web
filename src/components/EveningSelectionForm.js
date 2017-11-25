import React, {Component} from 'react';
import DateInput from "./widgets/inputs/DateInput";
import Button from "../widgets/Button";
import eveningSelectionFormActions from "../actions/pages/EveningSelectionFormActions";

const TABLES_VIEW = "TABLES_VIEW";
const TABLE_CREATION = "TABLE_CREATION";

export default class EveningSelectionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.eveningDate
        }
    }

    onDateChange(date) {
        this.setState({
            date: date
        });
    }

    onSelectEvening() {
        eveningSelectionFormActions.chooseEvening(this.state.date);
    }

    render() {
        const date = this.state.date;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="row">
                            <DateInput
                                label="Selezione serata"
                                commitAction={this.onDateChange.bind(this)}
                                default={date}/>
                        </div>
                        <div className="row top-sep text-center">
                            <Button
                                text="Ok"
                                type="info"
                                commitAction={this.onSelectEvening.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}