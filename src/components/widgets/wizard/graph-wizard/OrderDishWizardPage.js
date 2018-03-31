import React, {Component} from 'react';
import graphWizardActions from "./GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import {findByUuid} from "../../../../utils/Utils";
import Button from "../../../../widgets/Button";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import ordinationsEditorActions from "../../../../pages/evening/OrdinationsEditorActions";
import OrdinationReview from "../../../OrdinationReview";
import IntegerInput from "../../inputs/IntegerInput";
import PaginatedList from "../../PaginatedList";
import NavPills from "../../../../widgets/NavPills";
import NavElement from "../../../../widgets/NavElement";

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
        graphWizardActions.setWizardData(this.props.wizardId, option, "category");
        graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
        if (!this.props.wizardData["phases"]) {
            graphWizardActions.setWizardData(this.props.wizardId, this.props.data.get('phases').get(0).get('uuid'), "phases");
        }
        if (!this.props.wizardData["quantity"]) {
            graphWizardActions.setWizardData(this.props.wizardId, 0, "quantity");
        }
    }

    confirmDish(dish) {
        let newData;
        let wData = this.props.wizardData;
        if (dish) {
            let quantity = wData["quantity"] ? parseInt(wData["quantity"]) : 1;
            let phase = wData["phases"];
            ordinationsEditorActions.addOrders(dish, phase, quantity);
            graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
            graphWizardActions.setWizardData(this.props.wizardId, 0, "quantity");
        }
        this.setState((prevState) => {
            return {
                scrollPulse: prevState.scrollPulse + 1
            }
        });
    }

    render() {
        let selectedCategory = this.props.wizardData["category"];

        let phasesContent = this.buildPhasesContent();
        let nav = this.buildNav();
        let content = null;
        if (selectedCategory) {
            content = this.buildDishesContent(selectedCategory);
        } else {
            content = this.buildCategoriesContent();
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
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <IntegerInput
                                    default={this.props.wizardData["quantity"]}
                                    commitAction={value => this.setQuantity(value)}/>
                            </Column>
                        </Row>
                    </Column>
                    <Column lg="7">
                        <Row>
                            <Column>
                                {phasesContent}
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                {nav}
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                {content}
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

    buildPhasesContent() {
        let availablePhases = this.props.data.get('phases');
        return <PaginatedList
            rows={1}
            cols={4}
            entities={availablePhases}
            renderer={phase => phase.get('name')}
            selected={this.props.wizardData["phases"]}
            selectMethod={(phase) => this.setPhase(phase)}/>;
    }

    buildNav() {
        let navContent = this.buildNavContent();
        return <NavPills>
            {navContent}
        </NavPills>
    }

    buildNavContent() {
        let buttons = [];
        buttons.push(<NavElement
            key="categories"
            text="Categorie"
            active={!this.props.wizardData['category']}
            commitAction={() => this.selectCategory(null)}
        />);
        if (this.props.wizardData['category']) {
            buttons.push(<NavElement
                key="dishes"
                text={this.findCategory(this.props.wizardData['category']).get('name')}
                active={!!this.props.wizardData['category']}
            />);
        }
        return buttons;
    }

    findCategory(catUuid) {
        return findByUuid(this.props.data.get('categories'), catUuid);
    }

    findDish(dishUuid) {
        return findByUuid(this.props.data.get('dishes'), dishUuid);
    }

    buildCategoriesContent() {
        let selectedCategory = this.props.wizardData["category"];
        let availableCategories = this.props.data.get('categories');
        return <PaginatedList
            key="categories"
            rows={4}
            cols={3}
            id={cat => cat.get('uuid')}
            entities={availableCategories}
            renderer={cat => cat.get('name')}
            selected={selectedCategory}
            selectMethod={cat => this.selectCategory(cat)}
            deselectMethod={() => this.selectCategory(null)}/>;
    }

    buildDishesContent(categoryUuid) {
        let availableDishes = this.props.data.get('dishes')
            .filter(dish => dish.get('status') === "ATTIVO")
            .filter(dish => dish.get('category') === categoryUuid);
        return <PaginatedList
            key="dishes"
            rows={4}
            cols={2}
            id={dish => dish.get('uuid')}
            entities={availableDishes}
            renderer={dish => dish.get('name')}
            selectMethod={dish => this.confirmDish(dish)}/>;
    }
}