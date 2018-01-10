import React, {Component} from 'react';
import ordinationsCreatorActions from "../../../pages/evening/OrdinationsCreatorActions";
import OrdersEditor from "./OrdersEditor";

export default class OrdinationCreator extends Component {
    constructor(props) {
        super(props);
    }

    onWizardOk(orders) {
        ordinationsCreatorActions.createOrdination(this.props.data.table, orders);
    }

    onWizardAbort(data) {
        ordinationsCreatorActions.abortOrdinationCreation();
    }

    render() {
        return <div className="panel-body">
            <div className="form">
                <OrdersEditor
                    data={OrdinationCreator.makeOrdersEditorDescriptor(this.props.data)}
                    visible={true}
                    commitAction={this.onWizardOk.bind(this)}
                    abortAction={this.onWizardAbort}/>
            </div>
        </div>
    }

    static makeOrdersEditorDescriptor(props) {
        return {
            categories: props.categories,
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions,
            orders: []
        }
    }

    renderWizardData(wData) {
        if (wData["dishes"]) {
            return wData["quantity"] + " x " +
                this.props.dishes.find(d => d.uuid === wData["dishes"]).name +
                " (" + this.props.phases.find(f => f.uuid === wData["phases"]).name + ")";
        }
        return null;
    }

}