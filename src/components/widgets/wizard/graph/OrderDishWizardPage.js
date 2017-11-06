import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";

export default class OrderDishWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectOption(option) {
        let newDish = option;
        if (this.props.wizardData.pending.dish === newDish) {
            newDish = null;
        }
        let wData = {
            orders: this.props.wizardData.orders,
            pending: {
                category: newDish ? newDish.category : this.props.wizardData.pending.category,
                dish: newDish ? newDish.uuid : null,
                additions: null,
                quantity: 1
            }
        };
        graphWizardActions.setWizardData(wData);
    }


    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        classes.push(opt.uuid === this.props.wizardData.pending.dish ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    render() {

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
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                {buttons}
            </GraphWizardPage>
        )
    }

}