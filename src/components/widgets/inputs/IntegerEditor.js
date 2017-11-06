import React, {Component} from 'react';
import FloatInputWizardPage from "../wizard/FloatInputWizardPage";
import Wizard from "../wizard/Wizard";
import IntegerInputWizardPage from "../wizard/IntegerInputWizardPage";

export default class IntegerEditor extends Component {
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
            renderer={(data) => value}
            commitAction={this.onWizardClose.bind(this)}>
            <IntegerInputWizardPage default={value} placeholder={descriptor.placeholder}/>
        </Wizard>;
    }

}