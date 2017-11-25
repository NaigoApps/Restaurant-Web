import React, {Component} from 'react';
import graphWizardActions from "./GraphWizardActions";
import GraphWizardPage from "./graph/GraphWizardPage";

export default class SelectWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectOption(option) {
        graphWizardActions.setWizardData(option, this.props.identifier);
    }

    optionButtonClass(opt){
        let classes = ["btn", "btn-lg"];
        classes.push(opt === this.props.wizardData[this.props.identifier] ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    render() {
        let buttons = this.props.options.map((o, index) =>
            (
                <button key={index}
                        type="button"
                        className={this.optionButtonClass(o)}
                        onClick={this.selectOption.bind(this, o)}>
                    {this.props.optionRenderer(o)}
                </button>
            )
        );

        return (
            <GraphWizardPage>
                {buttons}
            </GraphWizardPage>
        )
    }

}