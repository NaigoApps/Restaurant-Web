import React, {Component} from 'react';
import FloatInputWizardPage from "../wizard/FloatInputWizardPage";
import Wizard from "../wizard/Wizard";

export default class FloatEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardClose(data){
        this.props.commitAction(data[0]);
    }

    render() {
        const descriptor = this.props.descriptor;
        const value = this.props.value;

        return <Wizard
            label={descriptor.label}
            renderer={(data) => value + "€"}
            commitAction={this.onWizardClose.bind(this)}>
            <FloatInputWizardPage default={value} placeholder={descriptor.placeholder}/>
        </Wizard>;
    }

}