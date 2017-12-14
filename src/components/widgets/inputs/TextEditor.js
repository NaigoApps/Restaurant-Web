import React, {Component} from 'react';
import TextInputWizardPage from "../wizard/TextInputWizardPage";
import GraphWizard from "../wizard/GraphWizard";

export default class TextEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData){
        this.props.commitAction(wData["text_page"]);
    }

    render() {
        const descriptor = this.props.descriptor;
        const value = this.props.value;
        const placeholder = this.props.placeholder;

        return <GraphWizard
            hideReview={true}
            initialPage="text_page"
            label={descriptor.label}
            renderer={wData => wData["text_page"]}
            commitAction={this.onWizardConfirm.bind(this)}>
            <TextInputWizardPage
                identifier="text_page"
                initializer={value}
                name={this.props.descriptor.label}
                placeholder={placeholder}
            />
        </GraphWizard>;
    }

}