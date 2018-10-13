import React, {Component} from 'react';
import GraphWizard from "../../../../../components/widgets/wizard/graph-wizard/GraphWizard";
import OrderDishWizardPage from "../../../../../components/widgets/wizard/graph-wizard/OrderDishWizardPage";
import OrderAdditionsWizardPage from "../../../../../components/widgets/wizard/graph-wizard/OrderAdditionsWizardPage";
import OrdinationsUtils from "../../../OrdinationsUtils";
import {findByUuid, iGet} from "../../../../../utils/Utils";
import {OrdersWizardPages} from "./OrdersEditingStore";
import {OrdersActions} from "./OrdersActions";

const {List} = require('immutable');


export default class OrdersEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardOk() {
        let orders = iGet(this.props, "ordersEditing.orders");
        this.props.commitAction(orders);
    }

    onWizardAbort(data) {
        this.props.abortAction();
    }

    render() {
        let data = this.props;
        let orders = iGet(data, "ordersEditing.orders");

        return <GraphWizard
            isValid={data => orders === null || orders.size > 0}
            page={iGet(data, "ordersEditing.wizardPage")}
            hideForm={true}
            visible={this.props.visible}
            size="lg"
            label={"Ordinazioni"}
            renderer={(data) => this.renderWizardData.bind(this)(data)}
            onMovePage={page => OrdersActions.selectWizardPage(page)}
            commitAction={this.onWizardOk.bind(this)}
            abortAction={this.onWizardAbort.bind(this)}
            abortText="Annulla comanda"
            confirmText="Conferma comanda"
        >

            <OrderDishWizardPage
                identifier={OrdersWizardPages.DISHES_PAGE}
                name="Inserimento piatti"
                label={dish => dish.get('name')}
                data={this.props}
            />

            <OrderAdditionsWizardPage
                identifier="additions"
                name="Inserimento varianti e modifica"
                label={add => add.get('name')}
                data={this.props}/>

        </GraphWizard>

    }

    renderWizardData(wData) {
        let orders = this.props.get('editingOrders');
        if (orders) {
            let sampleOrder = findByUuid(orders, wData["editing"]);
            if (sampleOrder) {
                let price = OrdinationsUtils.formatPrice(sampleOrder.get('price'));
                return "Ordine corrente: " +
                    OrdinationsUtils.renderExplodedOrder(sampleOrder, this.props.get('dishes'), this.props.get('additions')) +
                    " (" + price + ")";
            }
        }
        return "Ordine corrente: ";
    }

}