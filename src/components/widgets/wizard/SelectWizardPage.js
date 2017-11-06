import React, {Component} from 'react';
import wizardActions from "./WizardActions";
import WizardPage from "./WizardPage";

export default class SelectWizardPage extends Component {
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

        let option = this.state.option;

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