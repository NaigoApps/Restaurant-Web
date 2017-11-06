import React, {Component} from 'react';
import FormField from "./FormField";
import SelectInput from "./SelectInput";
import Wizard from "../wizard/Wizard";
import SelectWizardPage from "../wizard/SelectWizardPage";
import {findByUuid} from "../../../utils/Utils";

export default class EntitySelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardClose(data){
        this.props.commitAction(data[0].uuid);
    }

    render() {
        const descriptor = this.props.descriptor;

        return (
            <Wizard
                label={descriptor.label}
                renderer={data => this.props.value ? descriptor.renderer(findByUuid(descriptor.options, this.props.value)) : ""}
                commitAction={this.onWizardClose.bind(this)}>
                <SelectWizardPage
                    options={descriptor.options}
                    optionRenderer={opt => opt ? descriptor.renderer(opt) : ""}
                />
            </Wizard>
        );

    }

}