import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import {findByUuid} from "../../../../utils/Utils";
import OrdinationReview from "../../../OrdinationReview";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";
import QuantitySelector from "../../../../widgets/QuantitySelector";
import EntitySelector from "../../../../widgets/EntitySelector";
import OrdinationsUtils from "../../../../pages/evening/OrdinationsUtils";
import Button from "../../../../widgets/Button";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";

export default class OrderDishWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    setQuantity(value) {
        graphWizardActions.setWizardData(this.props.wizardId, value, "quantity");
    }

    setPhase(value) {
        graphWizardActions.setWizardData(this.props.wizardId, value, "phases");
    }

    selectCategory(option) {
        let newCategory = option.uuid;
        if (this.props.wizardData["category"] === newCategory) {
            newCategory = null;
        }
        graphWizardActions.setWizardData(this.props.wizardId, newCategory, "category");
        graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
        if (!this.props.wizardData["phases"]) {
            graphWizardActions.setWizardData(this.props.wizardId, this.props.phases[0].uuid, "phases");
        }
        if (!this.props.wizardData["quantity"]) {
            graphWizardActions.setWizardData(this.props.wizardId, 1, "quantity");
        }
    }

    confirmDish(dish) {
        let wData = this.props.wizardData;
        if (dish && wData["quantity"]) {
            let quantity = parseInt(wData["quantity"]);
            let newOrder;
            for (let i = 0; i < quantity; i++) {
                newOrder = OrdinationsUtils.makeOrder(
                    dish.uuid,
                    wData["phases"],
                    findByUuid(this.props.dishes, dish.uuid).price
                );
                wData["orders"].push(newOrder);
            }
            graphWizardActions.setWizardData(this.props.wizardId, wData["orders"], "orders");
            graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
            graphWizardActions.setWizardData(this.props.wizardId, 1, "quantity");
            // graphWizardActions.setWizardData(this.props.wizardId, newOrder, "editing");
        }
    }

    render() {
        let categoriesButtons = this.props.categories.map(cat => {
            return (
                <Button
                    key={cat.uuid}
                    active={cat.uuid === this.props.wizardData["category"]}
                    commitAction={this.selectCategory.bind(this, cat)}
                    text={cat.name}
                />
            );
        });

        let dishesButtons = [];
        if (this.props.wizardData["category"]) {
            let category = findByUuid(this.props.categories, this.props.wizardData["category"]);
            dishesButtons = this.props.dishes
                .filter(dish => dish.category === category.uuid)
                .map(o => {
                    return (
                        <Button
                            key={o.uuid}
                            active={o.uuid === this.props.wizardData["dishes"]}
                            commitAction={this.confirmDish.bind(this, o)}
                            text={o.name}
                        />
                    );
                });
        }
        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row grow>
                    <Column lg="4">
                        <Row grow>
                            <Column>
                                <OrdinationReview
                                    data={OrderDishWizardPage.makeOrdinationReviewDescriptor(this.props)}/>
                            </Column>
                        </Row>
                    </Column>
                    <Column lg="8">
                        <Row>
                            <Column>
                                <QuantitySelector
                                    selected={this.props.wizardData["quantity"]}
                                    numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                    commitAction={this.setQuantity.bind(this)}/>
                            </Column>
                            <Column>
                                <EntitySelector
                                    title="Portata"
                                    selected={this.props.wizardData["phases"]}
                                    entities={this.props.phases}
                                    renderer={p => p.name}
                                    commitAction={this.setPhase.bind(this)}/>
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column sm="5">
                                <PaginatedButtonGroup
                                    showNumbers={true}
                                    pageSize={7}>
                                    {categoriesButtons}
                                </PaginatedButtonGroup>
                            </Column>
                            <Column sm="7">
                                <PaginatedButtonGroup
                                    showNumbers={true}
                                    pageSize={7}>
                                    {dishesButtons}
                                </PaginatedButtonGroup>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

    static makeOrdinationReviewDescriptor(props) {
        return {
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions,
            orders: props.wizardData["orders"]
        }
    }
}