import React, {Component} from 'react';
import Wizard from "../wizard/Wizard";
import TextInputWizardPage from "../wizard/TextInputWizardPage";

export default class TouchTextEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardClose(data){
        this.props.commitAction(data[0]);
    }

    render() {
        const value = this.props.value;
        const descriptor = this.props.descriptor;

        return <Wizard
            label={descriptor.label}
            renderer={(data) => value}
            commitAction={this.onWizardClose.bind(this)}>
            <TextInputWizardPage default={value} placeholder={descriptor.placeholder}/>
        </Wizard>;
    }

}