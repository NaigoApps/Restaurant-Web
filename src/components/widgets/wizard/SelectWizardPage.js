import React, {Component} from 'react';
import graphWizardActions from "./GraphWizardActions";
import GraphWizardPage from "./graph/GraphWizardPage";
import Button from "../../../widgets/Button";

export default class SelectWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectOption(option) {
        graphWizardActions.setWizardData(this.props.wizardId, option, this.props.identifier);
    }

    render() {
        let buttons = this.props.options.map((o, index) =>
            (
                <Button key={index}
                        active={o === this.props.wizardData[this.props.identifier]}
                        commitAction={this.selectOption.bind(this, o)}
                        text={this.props.optionRenderer(o)}
                />
            )
        );

        return (
            <GraphWizardPage>
                {buttons}
            </GraphWizardPage>
        )
    }

}