import React, {Component} from 'react';
import GraphWizard from "../wizard/GraphWizard";
import OrderDishWizardPage from "../wizard/graph/OrderDishWizardPage";
import graphWizardActions from "../wizard/GraphWizardActions";
import OrderAdditionsWizardPage from "../wizard/graph/OrderAdditionsWizardPage";
import OrdinationsUtils from "../../../pages/evening/OrdinationsUtils";
import OrderFreeAdditionsWizardPage from "../wizard/graph/OrderFreeAdditionsWizardPage";
import OrderPriceQuantityWizardPage from "../wizard/graph/OrderPriceQuantityWizardPage";

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

            <OrderFreeAdditionsWizardPage
                identifier="free_additions"
                name="Variante libera"
                initializer={null}
                label={add => add.get('name')}
                data={this.props.data}/>

            <OrderPriceQuantityWizardPage
                identifier="price_quantity"
                name="Prezzo / Quantità"
                initializer={null}
                // label={add => add.get('name')}
                data={this.props.data}/>

        </GraphWizard>

    }

    renderWizardData(wData) {
        if (wData["editing"]) {
            let sampleOrder = wData["editing"];
            let name = OrdinationsUtils.renderOrder(sampleOrder, this.props.data.get('dishes'), this.props.data.get('phases'));
            let price = OrdinationsUtils.formatPrice(sampleOrder.get('price'));

            return "Ordine corrente: " + name + " (" + price + ")";
        }
        return "Ordine corrente: ";
    }

}