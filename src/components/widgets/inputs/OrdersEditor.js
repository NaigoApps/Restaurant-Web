import React, {Component} from 'react';
import GraphWizard from "../wizard/GraphWizard";
import OrderCategoryWizardPage from "../wizard/graph/OrderCategoryWizardPage";
import OrderDishWizardPage from "../wizard/graph/OrderDishWizardPage";
import OrdinationReviewPage from "../wizard/graph/OrdinationReviewPage";
import graphWizardActions from "../wizard/GraphWizardActions";
import {findByUuid} from "../../../utils/Utils";
import OrderAdditionsWizardPage from "../wizard/graph/OrderAdditionsWizardPage";

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

    onCategoryPageEnter(uuid, data) {
        graphWizardActions.setWizardData(uuid, 1, "quantity");
    }

    render() {
        return <GraphWizard
            isValid={data => data["review"] && data["review"].length > 0}
            initialPage="categories"
            hideForm={true}
            visible={this.props.visible}
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
                phases={this.props.phases}
                additions={this.props.additions}/>

            <OrderDishWizardPage
                identifier="dishes"
                name="Piatti"
                initializer={null}
                label={dish => dish.name}
                canEnter={this.canEnterInDishPage}
                options={this.getAvailableDishes.bind(this)}
                dishes={this.props.dishes}
                phases={this.props.phases}
                additions={this.props.additions}/>

            <OrderAdditionsWizardPage
                identifier="additions"
                name="Varianti"
                initializer={null}
                label={add => add.name}
                canEnter={this.canEnterInAdditionsPage}
                options={this.getAdditions.bind(this)}
                dishes={this.props.dishes}
                phases={this.props.phases}
                additions={this.props.additions}/>

            <OrdinationReviewPage
                identifier="review"
                type="success"
                name="Riepilogo"
                initializer={this.props.orders}
                dishes={this.props.dishes}
                phases={this.props.phases}
                additions={this.props.additions}/>

        </GraphWizard>

    }

    canEnterInDishPage(wData) {
        return !!wData["categories"];
    }

    canEnterInAdditionsPage(wData) {
        return !!wData["editing"];
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

    getAdditions(wData) {
        return this.props.additions;
    }

    getAvailableDishes(wData) {
        return this.props.dishes
            .filter(dish => !wData["categories"] || dish.category === wData["categories"]);
    }

    renderWizardData(wData) {
        if (wData["editing"]) {
            let order = wData["editing"];
            let dish = findByUuid(this.props.dishes, order.dish);
            let phase = findByUuid(this.props.phases, order.phase);
            let result = "Ordine corrente: " +
                (phase ? phase.name : "?") + ": " +
                (dish ? dish.name : "?") + " ";

            order.additions.forEach(uuid => {
                let addition = findByUuid(this.props.additions, uuid);
                if (addition) {
                    result += addition.name + " "
                }
            });

            return result + " (" + order.price + "€)";
        }
        return "Ordine corrente: ";
    }

}