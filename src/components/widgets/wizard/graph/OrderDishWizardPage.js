import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import {findByUuid} from "../../../../utils/Utils";
import OrdinationReview from "../../../OrdinationReview";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";
import KeyPad from "../../KeyPad";
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

    confirmDish(dish) {
        let wData = this.props.wizardData;
        if (dish && wData["quantity"]) {
            let quantity = parseInt(wData["quantity"]);
            let newOrder;
            for (let i = 0; i < quantity; i++) {
                newOrder = OrdinationsUtils.makeOrder(
                    dish.uuid,
                    wData["phases"],
                    findByUuid(this.props.dishes, dish.uuid).price,
                    this.props.ordination ? this.props.ordination.uuid : null
                );
                wData["review"].push(newOrder);
            }
            graphWizardActions.setWizardData(this.props.wizardId, wData["review"], "review");
            graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
            graphWizardActions.setWizardData(this.props.wizardId, 1, "quantity");
            graphWizardActions.setWizardData(this.props.wizardId, newOrder, "editing");
        }
    }

    render() {

        let buttons = this.props.options(this.props.wizardData).map(o => {
            return (
                <Button
                    key={o.uuid}
                    active={o.uuid === this.props.wizardData["dishes"]}
                    commitAction={this.confirmDish.bind(this, o)}
                    text={this.props.label(o)}
                />
            );
        });

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row>
                    <Column lg="5">
                        <Row>
                            <Column>
                                <OrdinationReview
                                    dishes={this.props.dishes}
                                    phases={this.props.phases}
                                    additions={this.props.additions}
                                    orders={this.props.wizardData["review"]}/>
                            </Column>
                        </Row>
                    </Column>
                    <Column lg="7">
                        <Row>
                            <Column>
                                <QuantitySelector
                                    selected={this.props.wizardData["quantity"]}
                                    numbers={[1, 2, 5, 10]}
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
                        <Row>
                            <Column>
                                <PaginatedButtonGroup
                                    showNumbers={true}
                                    pageSize={7}>
                                    {buttons}
                                </PaginatedButtonGroup>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}