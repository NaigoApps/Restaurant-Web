import React from 'react';
import OrdersEditor from "./ordersEditing/OrdersEditor";
import OrdinationReview from "./OrdinationReview";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";
import ConfirmModal from "../../../../widgets/ConfirmModal";
import {iGet} from "../../../../utils/Utils";
import {OrdinationsEditorActions} from "./OrdinationsEditorActions";
import {OrdersActions} from "./ordersEditing/OrdersActions";

export default class OrdinationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    doDeleteOrdination() {
        let tableUuid = iGet(this.props.data, "diningTableEditing.diningTable.uuid");
        let ordUuid = iGet(this.props.data, "ordinationEditing.ordination.uuid");
        OrdinationsEditorActions.deleteOrdination(tableUuid, ordUuid);
    }

    render() {
        const data = this.props.data;

        let ordinationEditorStatus = iGet(data, "ordinationEditing.status");
        let tableUuid = iGet(data, "diningTableEditing.diningTable.uuid");
        let ordinationUuid = iGet(data, "ordinationEditing.ordination.uuid");

        return <Row grow>
            <Column>
                <OrdinationReview data={data}/>
            </Column>
            <OrdersEditor
                data={this.props.data}
                visible={this.isOrdersEditorVisible()}
                commitAction={orders => this.props.actionsProvider.onConfirmOrders(tableUuid, ordinationUuid, orders)}
                abortAction={this.props.actionsProvider.onAbortOrders}/>
        </Row>;
    }

    isOrdersEditorVisible(){
        let data = this.props.data;
        return !!iGet(data, "ordinationEditing.ordinationEditor.visible");
    }



}