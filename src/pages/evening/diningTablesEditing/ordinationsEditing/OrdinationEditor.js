import React from 'react';
import ordinationsEditorActions from "./OrdinationsEditorActions";
import OrdersEditor from "./ordersEditing/OrdersEditor";
import OrdinationReview from "./OrdinationReview";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";
import ConfirmModal from "../../../../widgets/ConfirmModal";
import {iGet} from "../../../../utils/Utils";
import {EditorStatus} from "../../../StoresUtils";
import {OrdersActions} from "./ordersEditing/OrdersActions";
import {OrdinationsActionTypes, OrdinationsCreatorActions} from "./OrdinationsCreatorActions";

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
        const data = this.props.data;

        return <Row grow>
            <Column>
                <OrdinationReview data={data}/>
            </Column>
            <Column sm="3">
                {OrdinationEditor.getOrdinationActions(data)}
            </Column>
            <OrdersEditor
                data={this.props.data}
                visible={this.isOrdersEditorVisible()}
                commitAction={this.onWizardOk.bind(this)}
                abortAction={() => OrdinationsCreatorActions.abortOrdinationCreation()}/>
        </Row>;
    }

    isOrdersEditorVisible(){
        let data = this.props.data;
        if(iGet(data, "ordinationEditing.status") === EditorStatus.CREATING){
            return true;
        }
        return false;
    }

    static printOrdination(ordination) {
        ordinationsEditorActions.printOrdination(ordination.uuid);
    }

    static getOrdinationActions(data) {
        let ordination = iGet(data, "ordinationEditing.ordination");

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <h5 className="text-center">Azioni sulla comanda</h5>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <Button
                            text="Modifica comanda"
                            icon="pencil"
                            size="lg"
                            commitAction={() => ordinationsEditorActions.beginOrdersEditing(data.get('editingOrdination').get('orders'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Button text="Stampa comanda"
                                icon="print"
                                size="lg"
                                type={ordination.get('dirty') ? "warning" : "secondary"}
                                commitAction={() => ordinationsEditorActions.printOrdination(ordination.get('uuid'))}
                                fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Button
                            text="Annullamento comanda"
                            icon="times-circle"
                            type="danger"
                            size="lg"
                            commitAction={() => ordinationsEditorActions.sendAbortOrdination(ordination.get('uuid'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Button text="Elimina comanda"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => this.showDeleteOrdinationModal()}
                                fullHeight/>
                    </Column>
                </Row>
                <Row>
                    <ConfirmModal
                        // visible={this.state.deletingOrdination}
                        message="Elminare la comanda e tutti gli ordini associati?"
                        abortType="secondary"
                        confirmType="danger"
                        abortAction={() => this.hideDeleteOrdinationModal()}
                        confirmAction={() => this.doDeleteOrdination()}/>
                </Row>
            </Column>
        </Row>;
    }

}