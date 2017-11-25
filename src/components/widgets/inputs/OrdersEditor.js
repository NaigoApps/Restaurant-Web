import React, {Component} from 'react';
import GraphWizard from "../wizard/GraphWizard";
import OrderCategoryWizardPage from "../wizard/graph/OrderCategoryWizardPage";
import OrderDishWizardPage from "../wizard/graph/OrderDishWizardPage";
import OrdinationReviewPage from "../wizard/graph/OrdinationReviewPage";
import graphWizardActions from "../wizard/GraphWizardActions";

export default class OrdersEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardOk(data) {
        this.props.commitAction(data["review"]);
    }

    onWizardAbort(data) {
        this.props.abortAction();
    }

    resetQuantity(wData) {
        graphWizardActions.setWizardData("", "quantity");
    }

    onCategoryPageEnter() {
        graphWizardActions.setWizardData(1, "quantity");
    }

    render() {
        return <GraphWizard
            isValid={data => data["review"] && data["review"].length > 0}
            initialPage="categories"
            autoShow={this.props.autoShow}
            label={"Ordinazioni"}
            renderer={(data) => this.renderWizardData.bind(this)(data)}
            commitAction={this.onWizardOk.bind(this)}
            abortAction={this.onWizardAbort.bind(this)}>

            <OrderCategoryWizardPage
                identifier="categories"
                name="Categorie"
                initializer={null}
                label={cat => cat.name}
                onEnter={this.onCategoryPageEnter}
                options={this.getAvailableCategories.bind(this)}
                dishes={this.props.dishes}
                phases={this.props.phases}/>

            <OrderDishWizardPage
                identifier="dishes"
                name="Piatti"
                initializer={null}
                label={dish => dish.name}
                canEnter={this.canEnterInDishPage}
                options={this.getAvailableDishes.bind(this)}
                dishes={this.props.dishes}
                phases={this.props.phases}/>

            <OrdinationReviewPage
                identifier="review"
                type="success"
                icon="ok"
                initializer={this.props.orders}
                dishes={this.props.dishes}
                phases={this.props.phases}/>

        </GraphWizard>

    }

    canEnterInDishPage(wData) {
        return !!wData["categories"];
    }

    canEnterInQuantityPage(wData) {
        return !!wData["dishes"];
    }

    getAvailableCategories(wData) {
        return this.props.categories;
    }

    getPhases(wData) {
        return this.props.phases;
    }

    getAvailableDishes(wData) {
        return this.props.dishes
            .filter(dish => !wData["categories"] || dish.category === wData["categories"]);
    }

    renderWizardData(wData) {
        if (wData["dishes"]) {
            return wData["quantity"] + " x " +
                this.props.dishes.find(d => d.uuid === wData["dishes"]).name +
                " (" + this.props.phases.find(f => f.uuid === wData["phases"]).name + ")";
        }
        return null;
    }

}