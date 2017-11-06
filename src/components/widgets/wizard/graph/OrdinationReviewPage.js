import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";

export default class OrdinationReviewPage extends Component {
    constructor(props) {
        super(props);
    }

    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        classes.push(opt.uuid === this.props.wizardData.category ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    render() {

        let rows = this.props.wizardData.orders.map(o => {
            return (
                <li key={o.dish} className="list-group-item">
                    {o.quantity + " x " + this.props.dishes.find(d => d.uuid === o.dish).name}
                </li>
            );
        });

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <ul className="list-group">
                    {rows}
                </ul>
            </GraphWizardPage>
        )
    }

}