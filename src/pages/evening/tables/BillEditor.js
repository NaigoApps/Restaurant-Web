import React, {Component} from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import EntityEditor from "../../../components/editors/EntityEditor";
import DiningTablesUtils from "./DiningTablesUtils";
import PaginatedList from "../../../components/widgets/PaginatedList";
import {findByUuid} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";

export default class BillEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let table = this.props.data.get('editingTable');
        let bill = this.props.data.get('selectedBill');
        let customers = this.props.data.get('customers');

        let ordersList = this.buildOrdersList();
        let orderEditor = this.buildOrderEditor();

        return <EntityEditor
            entity={bill}
            render={(entity) => DiningTablesUtils.renderBill(entity, customers)}
            deleteMethod={uuid => diningTablesEditorActions.deleteBill(table.get('uuid'), uuid)}>
            <Row>
                <Column sm="4">
                    {ordersList}
                </Column>
                <Column sm="6">
                    {orderEditor}
                </Column>
            </Row>
        </EntityEditor>;
    }

    buildOrdersList(){
        let tableOrders = DiningTablesUtils.findTableOrders(this.props.data.get('editingTable'));
        let bill = this.props.data.get('selectedBill');
        let orders = bill.get('orders')
            .map(orderId => findByUuid(tableOrders, orderId));
        orders = DiningTablesUtils.implode(orders);

        return <PaginatedList
            id={order => order.get('groupId')}
            rows={8}
            cols={1}
            entities={orders}
            renderer={order => order.get('quantity')}
        />;
    }

    buildOrderEditor(){

    }
}