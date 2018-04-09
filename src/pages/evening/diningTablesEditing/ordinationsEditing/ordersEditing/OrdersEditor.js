import React, {Component} from 'react';
import GraphWizard from "../../../../../components/widgets/wizard/graph-wizard/GraphWizard";
import OrderDishWizardPage from "../../../../../components/widgets/wizard/graph-wizard/OrderDishWizardPage";
import graphWizardActions from "../../../../../components/widgets/wizard/graph-wizard/GraphWizardActions";
import OrderAdditionsWizardPage from "../../../../../components/widgets/wizard/graph-wizard/OrderAdditionsWizardPage";
import OrdinationsUtils from "../../../OrdinationsUtils";
import OrderFreeAdditionsWizardPage from "../../../../../components/widgets/wizard/graph-wizard/OrderFreeAdditionsWizardPage";
import OrderPriceQuantityWizardPage from "../../../../../components/widgets/wizard/graph-wizard/OrderPriceQuantityWizardPage";
import {findByUuid, iGet} from "../../../../../utils/Utils";
import {OrdersWizardPages} from "./OrdersEditingStore";

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
        let data = this.props.data;
        let orders = iGet(data, "ordersEditing.orders");
        let ordination = iGet(data, "ordinationEditing.ordination");
        // let orders = ordination.get('orders');

        return <GraphWizard
            isValid={data => orders.size > 0}
            page={iGet(data, "ordersEditing.wizardPage")}
            hideForm={true}
            visible={this.props.visible}
            size="lg"
            label={"Ordinazioni"}
            renderer={(data) => this.renderWizardData.bind(this)(data)}
            commitAction={this.onWizardOk.bind(this)}
            abortAction={this.onWizardAbort.bind(this)}>

            <OrderDishWizardPage
                identifier={OrdersWizardPages.DISHES_PAGE}
                name="Piatti"
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