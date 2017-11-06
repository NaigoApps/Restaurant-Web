import React, {Component} from 'react';
import entitySelectorWizardActions from "./WizardActions";
import entitySelectorWizardStore from "./WizardStore";
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';

export default class EntitiesSelectionWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
    }

    toggleSelection(){

    }

    render() {
        let buttons = this.props.options(this.props.data).map(o => {
            return (
                <button key={o.uuid}
                        type="button"
                        className="btn btn-default btn-lg"
                        onClick={this.toggleSelection.bind(this, o)}>
                    {o.name}
                </button>
            );
        });

        return (
            <div>
                {buttons}
            </div>
        )
    }

}