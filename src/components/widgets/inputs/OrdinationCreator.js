import React, {Component} from 'react';
import GraphWizard from "../wizard/GraphWizard";
import OrderCategoryWizardPage from "../wizard/graph/OrderCategoryWizardPage";
import OrderDishWizardPage from "../wizard/graph/OrderDishWizardPage";
import OrdinationReviewPage from "../wizard/graph/OrdinationReviewPage";
import graphWizardActions from "../wizard/GraphWizardActions";
import IntegerInputWizardPage from "../wizard/IntegerInputWizardPage";
import IntegerInputGraphWizardPage from "../wizard/graph/IntegerInputGraphWizardPage";
import ordinationsCreatorActions from "../../../pages/evening/OrdinationsCreatorActions";

export default class OrdinationCreator extends Component {
    constructor(props) {
        super(props);
    }


    onWizardClose(data) {
        ordinationsCreatorActions.createOrdination(data.orders)
    }

    confirmDish(wData) {
        let order = wData.pending;
        if (order.dish) {
            this.addOrder(wData.orders, order);
            graphWizardActions.setWizardData({
                orders: wData.orders,
                pending: {
                    category: wData.pending.category,
                    quantity: 1
                }
            });
        }
    }

    addOrder(orders, order) {
        let found = false;
        orders.forEach(o => {
            if (o.dish === order.dish) {
                o.quantity += order.quantity;
                found = true;
            }
        });
        if (!found) {
            delete order.category;
            order.table = this.props.table;
            orders.push(order);
        }
    }

    render() {
        const descriptor = this.props.descriptor;

        return <div className="panel-body">
            <div className="form">
                <GraphWizard
                    initializer={() => {
                        return {orders: [], pending: {}}
                    }}
                    autoShow={true}
                    label={"Ordinazioni"}
                    renderer={(data) => this.renderWizardData.bind(this)(data)}
                    commitAction={this.onWizardClose.bind(this)}>

                    <OrderCategoryWizardPage
                        identifier="categories"
                        name="Categorie"
                        label={cat => cat.name}
                        options={this.getAvailableCategories.bind(this)}/>

                    <OrderDishWizardPage
                        identifier="dishes"
                        name="Piatti"
                        label={dish => dish.name}
                        canEnter={this.canEnterInDishPage}
                        options={this.getAvailableDishes.bind(this)}/>

                    <IntegerInputGraphWizardPage
                        identifier="quantity"
                        name="Quantità"
                        default={data => data.pending.quantity}
                        canEnter={this.canEnterInQuantityPage}
                        label={dish => dish.name}/>

                    <OrdinationReviewPage
                        identifier="review"
                        type="success"
                        name="Riepilogo"
                        dishes={this.props.dishes}
                        onEnter={this.confirmDish.bind(this)}/>

                </GraphWizard>
            </div>
        </div>

    }

    canEnterInDishPage(wData){
        return !!wData.pending.category;
    }

    canEnterInQuantityPage(wData){
        return !!wData.pending.dish;
    }

    getAvailableCategories(wData) {
        return this.props.categories;
    }

    getAvailableDishes(wData) {
        let dishes = this.props.dishes
            .filter(dish => !wData.pending.category || dish.category === wData.pending.category);
        return dishes;
    }

    renderWizardData(wData) {
        if (wData.pending.dish) {
            return wData.pending.quantity + " x " + this.props.dishes.find(d => d.uuid === wData.pending.dish).name;
        }
        return null;
    }

}