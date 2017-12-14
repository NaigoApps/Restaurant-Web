import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import OrdinationEditor from "../../../OrdinationEditor";
import OrdinationReview from "../../../OrdinationReview";
import EntitySelector from "../../../../widgets/EntitySelector";
import QuantitySelector from "../../../../widgets/QuantitySelector";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";
import Button from "../../../../widgets/Button";
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";

export default class OrderCategoryWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    setQuantity(value) {
        graphWizardActions.setWizardData(this.props.wizardId, value, "quantity");
    }

    setPhase(value) {
        graphWizardActions.setWizardData(this.props.wizardId, value, "phases");
    }

    selectOption(option) {
        let newCategory = option.uuid;
        if (this.props.wizardData["category"] === newCategory) {
            newCategory = null;
        }
        graphWizardActions.setWizardData(this.props.wizardId, newCategory, this.props.identifier);
        graphWizardActions.setWizardData(this.props.wizardId, null, "dishes");
        if (!this.props.wizardData["phases"]) {
            graphWizardActions.setWizardData(this.props.wizardId, this.props.phases[0].uuid, "phases");
        }
        if (!this.props.wizardData["quantity"]) {
            graphWizardActions.setWizardData(this.props.wizardId, 1, "quantity");
        }
        graphWizardActions.movePage(this.props.wizardId, "dishes");
    }

    render() {
        let buttons = this.props.options(this.props.wizardData).map(o => {
            return (
                <Button
                    key={o.uuid}
                    active={o.uuid === this.props.wizardData["categories"]}
                    commitAction={this.selectOption.bind(this, o)}
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