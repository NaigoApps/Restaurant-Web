import React, {Component} from 'react';
import GraphWizard from "../wizard/GraphWizard";
import OrderDishWizardPage from "../wizard/graph/OrderDishWizardPage";
import graphWizardActions from "../wizard/GraphWizardActions";
import OrderAdditionsWizardPage from "../wizard/graph/OrderAdditionsWizardPage";
import OrdinationsUtils from "../../../pages/evening/OrdinationsUtils";

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
        return <GraphWizard
            isValid={data => data["orders"] && data["orders"].length > 0}
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
                initializer={this.props.data.orders}
                label={dish => dish.name}
                categories={this.props.data.categories}
                dishes={this.props.data.dishes}
                phases={this.props.data.phases}
                additions={this.props.data.additions}/>

            <OrderAdditionsWizardPage
                identifier="additions"
                name="Varianti"
                initializer={null}
                label={add => add.name}
                dishes={this.props.data.dishes}
                phases={this.props.data.phases}
                additions={this.props.data.additions}/>

        </GraphWizard>

    }

    renderWizardData(wData) {
        if (wData["editing"]) {
            let sampleOrder = wData["editing"];
            let name = OrdinationsUtils.renderOrder(sampleOrder, this.props.data.dishes, this.props.data.phases);
            let price = OrdinationsUtils.formatPrice(sampleOrder.price);

            return "Ordine corrente: " + name + " (" + price + ")";
        }
        return "Ordine corrente: ";
    }

}