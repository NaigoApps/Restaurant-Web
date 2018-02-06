import React, {Component} from 'react';
import ordinationsCreatorActions from "../../../pages/evening/OrdinationsCreatorActions";
import OrdersEditor from "./OrdersEditor";
import {findByUuid} from "../../../utils/Utils";

export default class OrdinationCreator extends Component {
    constructor(props) {
        super(props);
    }

    onWizardOk() {
        let table = this.props.data.get('editingTable');
        ordinationsCreatorActions.createOrdination(table.get('uuid'), this.props.data.get('editingOrders'));
    }

    onWizardAbort() {
        ordinationsCreatorActions.abortOrdinationCreation();
    }

    render() {
        return <div className="panel-body">
            <div className="form">
                <OrdersEditor
                    data={this.props.data}
                    visible={true}
                    commitAction={this.onWizardOk.bind(this)}
                    abortAction={this.onWizardAbort}/>
            </div>
        </div>
    }

    renderWizardData(wData) {
        if (wData["dishes"]) {
            return wData["quantity"] + " x " +
                findByUuid(this.props.get('dishes'), wData["dishes"]).name +
                " (" + findByUuid(this.props.get('phases'), wData["phases"]).name + ")";
        }
        return null;
    }

}