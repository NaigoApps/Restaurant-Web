import React, {Component} from 'react';
import wizardActions from "./WizardActions";
import WizardPage from "./WizardPage";

export default class EntitySelectionWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: this.props.default || ""
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            option: this.props.default || ""
        });
    }

    selectOption(option) {
        this.setState({
            option : option
        });
    }

    optionButtonClass(opt){
        let classes = ["btn", "btn-lg"];
        classes.push(opt === this.state.option ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    render() {
        let option = this.state.option;

        let buttons = this.props.options(this.props.wizardData).map(o => {
            return (
                <button key={o.uuid}
                        type="button"
                        className={this.optionButtonClass(o)}
                        onClick={this.selectOption.bind(this, o)}>
                    {this.props.label(o)}
                </button>
            );
        });

        return (
            <WizardPage
                pageData={option}
                goBackAction={this.props.goBackAction}
                goOnAction={this.props.goOnAction}
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}
                valid={!!option}>
                {buttons}
            </WizardPage>
        )
    }

}