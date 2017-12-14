import React, {Component} from 'react';
import GraphWizard from "../wizard/GraphWizard";
import OrderCategoryWizardPage from "../wizard/graph/OrderCategoryWizardPage";
import OrderDishWizardPage from "../wizard/graph/OrderDishWizardPage";
import OrdinationReviewPage from "../wizard/graph/OrdinationReviewPage";
import graphWizardActions from "../wizard/GraphWizardActions";
import ordinationsCreatorActions from "../../../pages/evening/OrdinationsCreatorActions";
import {findByUuid} from "../../../utils/Utils";
import OrdersEditor from "./OrdersEditor";

export default class OrdinationCreator extends Component {
    constructor(props) {
        super(props);
    }

    onWizardOk(orders) {
        ordinationsCreatorActions.createOrdination({
            table: this.props.table,
            orders : orders
        });
    }

    onWizardAbort(data) {
        ordinationsCreatorActions.abortOrdinationCreation();
    }

    render() {
        const descriptor = this.props.descriptor;

        return <div className="panel-body">
            <div className="form">
                <OrdersEditor
                    visible={true}
                    categories={this.props.categories}
                    dishes={this.props.dishes}
                    phases={this.props.phases}
                    orders={[]}
                    commitAction={this.onWizardOk.bind(this)}
                    abortAction={this.onWizardAbort}/>
            </div>
        </div>

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