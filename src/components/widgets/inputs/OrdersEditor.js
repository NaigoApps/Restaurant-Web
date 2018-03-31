import React, {Component} from 'react';
import GraphWizard from "../wizard/graph-wizard/GraphWizard";
import OrderDishWizardPage from "../wizard/graph-wizard/OrderDishWizardPage";
import graphWizardActions from "../wizard/graph-wizard/GraphWizardActions";
import OrderAdditionsWizardPage from "../wizard/graph-wizard/OrderAdditionsWizardPage";
import OrdinationsUtils from "../../../pages/evening/OrdinationsUtils";
import OrderFreeAdditionsWizardPage from "../wizard/graph-wizard/OrderFreeAdditionsWizardPage";
import OrderPriceQuantityWizardPage from "../wizard/graph-wizard/OrderPriceQuantityWizardPage";
import {findByUuid} from "../../../utils/Utils";

const {List} = require('immutable');


export default class OrdersEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardOk(data) {
        this.props.commitAction(data["orders"]);
    }

    onWizardAbort(data) {
        this.props.abortAction();
    }

    onCategoryPageEnter(uuid, data) {
        graphWizardActions.setWizardData(uuid, 1, "quantity");
    }

    render() {
        let orders = this.props.data.get('editingOrders');
        if (!orders) {
            orders = this.props.data.get('editingOrdination').get('orders');
        }

        return <GraphWizard
            isValid={data => orders.size > 0}
            initialPage="orders"
            hideForm={true}
            visible={this.props.visible}
            size="lg"
            label={"Ordinazioni"}
            renderer={(data) => this.renderWizardData.bind(this)(data)}
            commitAction={this.onWizardOk.bind(this)}
            abortAction={this.onWizardAbort.bind(this)}>

            <OrderDishWizardPage
                identifier="orders"
                name="Piatti"
                initializer={orders}
                label={dish => dish.get('name')}
                data={this.props.data}/>

            <OrderAdditionsWizardPage
                identifier="additions"
                name="Varianti"
                initializer={null}
                label={add => add.get('name')}
                data={this.props.data}/>

            <OrderPriceQuantityWizardPage
                identifier="price_quantity"
                name="Prezzo / Quantità"
                initializer={null}
                data={this.props.data}/>

            <OrderFreeAdditionsWizardPage
                identifier="free_additions"
                canEnter={data => data && !!data['editing']}
                name="Variante libera"
                initializer={null}
                label={add => add.get('name')}
                data={this.props.data}/>

        </GraphWizard>

    }

    renderWizardData(wData) {
        let orders = this.props.data.get('editingOrders');
        if (orders) {
            let sampleOrder = findByUuid(orders, wData["editing"]);
            if (sampleOrder) {
                let price = OrdinationsUtils.formatPrice(sampleOrder.get('price'));
                return "Ordine corrente: " +
                    OrdinationsUtils.renderExplodedOrder(sampleOrder, this.props.data.get('dishes'), this.props.data.get('additions')) +
                    " (" + price + ")";
            }
        }
        return "Ordine corrente: ";
    }

}