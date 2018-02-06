import React from 'react';
import Button from "../widgets/Button";
import ordinationsEditorActions from "../pages/evening/OrdinationsEditorActions";
import OrdersEditor from "./widgets/inputs/OrdersEditor";
import OrdinationReview from "./OrdinationReview";
import Row from "../widgets/Row";
import Column from "../widgets/Column";

export default class OrdinationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    showEditWizard() {
        ordinationsEditorActions.beginOrdersEditing();
    }

    onWizardOk() {
        let ordination = this.props.data.get('editingOrdination');
        let orders = this.props.data.get('editingOrders');
        ordinationsEditorActions.editOrdination(ordination.get('uuid'), orders);
    }

    onWizardAbort() {
        ordinationsEditorActions.abortOrdersEditing();
    }

    render() {
        let ordersEditor;
        let ordination = this.props.data.get('editingOrdination');
        if (ordination) {
            ordersEditor = <OrdinationReview data={this.props.data}/>;
            return <Row grow>
                <Column>
                    {ordersEditor}
                </Column>
                <OrdersEditor
                    data={this.props.data}
                    visible={!!this.props.data.get('editingOrders')}
                    commitAction={this.onWizardOk.bind(this)}
                    abortAction={this.onWizardAbort}/>
            </Row>;
        }
        return <div/>;
    }

    printOrdination(ordination) {
        ordinationsEditorActions.printOrdination(ordination.uuid);
    }

}