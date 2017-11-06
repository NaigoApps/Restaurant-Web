import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";

export default class OrderCategoryWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectOption(option) {
        let newCategory = option.uuid;
        if (this.props.wizardData.pending.category === newCategory) {
            newCategory = null;
        }
        let wData = {
            orders: this.props.wizardData.orders,
            pending: {
                category: newCategory,
                dish: null,
                additions: null,
                quantity: 1
            }
        };
        graphWizardActions.setWizardData(wData);
        graphWizardActions.movePage("dishes");
    }


    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        classes.push(opt.uuid === this.props.wizardData.pending.category ? "btn-primary" : "btn-default");
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
                <div className="btn-group-vertical">
                    {buttons}
                </div>
            </GraphWizardPage>
        )
    }

}