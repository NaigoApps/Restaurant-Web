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
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <DateInput
                                label="Selezione serata"
                                commitAction={this.onDateChange.bind(this)}
                                default={date}/>
                        </div>
                    </div>
                    <div className="row top-sep text-center">
                        <div className="col-sm-12">
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