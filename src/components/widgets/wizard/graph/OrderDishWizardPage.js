import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import {findByUuid} from "../../../../utils/Utils";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";
import QuantitySelector from "../../../../widgets/QuantitySelector";
import EntitySelector from "../../../../widgets/EntitySelector";
import Button from "../../../../widgets/Button";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import ordinationsEditorActions from "../../../../pages/evening/OrdinationsEditorActions";
import OrdersCrudList from "../../../OrdersCrudList";
import FloatInput from "../../inputs/FloatInput";
import OrdinationReview from "../../../OrdinationReview";

const {List, fromJS} = require('immutable');

export default class OrderDishWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollPulse: 0
        };
    }

    selectGroup(sampleOrder) {
        graphWizardActions.setWizardData(this.props.wizardId, sampleOrder, "editing");
    }

    setQuantity(value) {
        graphWizardActions.setWizardData(this.props.wizardId, value, "quantity");
    }

    setPhase(value) {
        graphWizardActions.setWizardData(this.props.wizardId, value, "phases");
    }

    selectCategory(option) {
        let newCategory = option.get('uuid');
        if (this.props.wizardData["category"] === newCategory) {
            newCategory = null;
        }
        graphWizardActions.setWizardData(this.props.wizardId, newCategory, "category");
        graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
        if (!this.props.wizardData["phases"]) {
            graphWizardActions.setWizardData(this.props.wizardId, this.props.data.get('phases').get(0).get('uuid'), "phases");
        }
        if (!this.props.wizardData["quantity"]) {
            graphWizardActions.setWizardData(this.props.wizardId, 1, "quantity");
        }
    }

    confirmDish(dish) {
        let newData;
        let wData = this.props.wizardData;
        if (dish && wData["quantity"]) {
            let quantity = parseInt(wData["quantity"]);
            let phase = wData["phases"];
            ordinationsEditorActions.addOrders(dish, phase, quantity);
            graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
            graphWizardActions.setWizardData(this.props.wizardId, 1, "quantity");
        }
        this.setState((prevState) => {
            return {
                scrollPulse: prevState.scrollPulse + 1
            }
        });
    }

    render() {
        let categoriesButtons = this.props.data.get('categories').map(cat => {
            return (
                <Button
                    key={cat.get('uuid')}
                    size="lg"
                    active={cat.get('uuid') === this.props.wizardData["category"]}
                    commitAction={this.selectCategory.bind(this, cat)}
                    text={cat.get('name')}
                />
            );
        });

        let dishesButtons = List();
        let availableDishes = List();
        if (this.props.wizardData["category"]) {
            let category = findByUuid(this.props.data.get('categories'), this.props.wizardData["category"]);
            availableDishes = this.props.data.get('dishes')
                .filter(dish => dish.get('category') === category.get('uuid'))
            dishesButtons = availableDishes.map(o => {
                return (
                    <Button
                        key={o.get('uuid')}
                        size="lg"
                        active={o.get('uuid') === this.props.wizardData["dishes"]}
                        commitAction={this.confirmDish.bind(this, o)}
                        text={o.get('name')}
                    />
                );
            });
        }

        let sampleOrder = this.props.wizardData["editing"];

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row grow>
                    <Column lg="5">
                        <Row grow>
                            <Column>
                                <OrdinationReview
                                    data={this.props.data}
                                />
                                {/*<OrdersCrudList*/}
                                    {/*scrollPulse={this.state.scrollPulse}*/}
                                    {/*refreshPulse={this.state.refreshPulse}*/}
                                    {/*data={this.props.data}*/}
                                    {/*selectedOrder={sampleOrder}*/}
                                    {/*commitAction={this.selectGroup.bind(this)}*/}
                                {/*/>*/}
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <FloatInput default="0"/>
                            </Column>
                        </Row>
                    </Column>
                    <Column lg="7">
                        <Row>
                            {/*<Column>*/}
                                {/*<QuantitySelector*/}
                                    {/*selected={this.props.wizardData["quantity"]}*/}
                                    {/*numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}*/}
                                    {/*commitAction={this.setQuantity.bind(this)}/>*/}
                            {/*</Column>*/}
                            <Column>
                                <EntitySelector
                                    title="Portata"
                                    selected={this.props.wizardData["phases"]}
                                    entities={this.props.data.get('phases')}
                                    renderer={p => p.get('name')}
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
                                    data={availableDishes}
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

}