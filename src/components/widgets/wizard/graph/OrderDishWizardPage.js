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

export default class OrderDishWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    setQuantity(value) {
        graphWizardActions.setWizardData(value, "quantity");
    }

    setPhase(value) {
        graphWizardActions.setWizardData(value, "phases");
    }

    confirmDish(dish) {
        let wData = this.props.wizardData;
        if (dish && wData["quantity"]) {
            let quantity = parseInt(wData["quantity"]);
            for (let i = 0; i < quantity; i++) {
                wData["review"].push(OrdinationsUtils.makeOrder(
                    dish.uuid,
                    wData["phases"],
                    findByUuid(this.props.dishes, dish.uuid).price,
                    this.props.ordination ? this.props.ordination.uuid : null
                ));
            }
            graphWizardActions.setWizardData(wData["review"], "review");
            graphWizardActions.setWizardData(null, "dishes");
            graphWizardActions.setWizardData(1, "quantity");
        }
    }

    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        classes.push(opt.uuid === this.props.wizardData["dishes"] ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    render() {

        let buttons = this.props.options(this.props.wizardData).map(o => {
            return (
                <button key={o.uuid}
                        type="button"
                        className={this.optionButtonClass(o)}
                        onClick={this.confirmDish.bind(this, o)}>
                    {this.props.label(o)}
                </button>
            );
        });

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <div className="row">
                    <div className="col-sm-5 text-center">
                        <PaginatedButtonGroup>
                            {buttons}
                        </PaginatedButtonGroup>
                    </div>
                    <div className="col-sm-7">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6">
                                    <QuantitySelector
                                        selected={this.props.wizardData["quantity"]}
                                        numbers={[1, 2, 5, 10]}
                                        commitAction={this.setQuantity.bind(this)}/>
                                </div>
                                <div className="col-sm-6">
                                    <EntitySelector
                                        title="Portata"
                                        selected={this.props.wizardData["phases"]}
                                        entities={this.props.phases}
                                        renderer={p => p.name}
                                        commitAction={this.setPhase.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well well-sm">
                                    <OrdinationReview
                                        dishes={this.props.dishes}
                                        phases={this.props.phases}
                                        orders={this.props.wizardData["review"]}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GraphWizardPage>
        )
    }

}