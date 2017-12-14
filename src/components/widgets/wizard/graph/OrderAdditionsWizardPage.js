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

export default class OrderAdditionsWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    toggleAddition(addition) {
        let wData = this.props.wizardData;
        if (wData["editing"]) {
            let editingOrder = wData["editing"];
            let orders = wData["review"];
            let orderIndex = orders.findIndex(order => OrdinationsUtils.sameOrder(order, editingOrder) && order.phase === editingOrder.phase);

            let additionIndex = orders[orderIndex].additions.findIndex(a => a === addition.uuid);
            if (additionIndex !== -1) {
                orders[orderIndex].additions.splice(additionIndex, 1);
            } else {
                orders[orderIndex].additions.push(addition.uuid);
            }

            graphWizardActions.setWizardData(this.props.wizardId, orders, "review");
        }
    }

    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        let wData = this.props.wizardData;
        let editingOrder = wData["editing"];
        if (editingOrder.additions.includes(opt.uuid)) {
            classes.push("btn-primary");
        } else {
            classes.push("btn-default");
        }
        return classes.join(" ");
    }

    render() {

        let buttons = this.props.options(this.props.wizardData).map(o => {
            return (
                <button key={o.uuid}
                        type="button"
                        className={this.optionButtonClass(o)}
                        onClick={this.toggleAddition.bind(this, o)}>
                    {this.props.label(o)}
                </button>
            );
        });

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well well-sm">
                                    <OrdinationReview
                                        dishes={this.props.dishes}
                                        phases={this.props.phases}
                                        additions={this.props.additions}
                                        orders={this.props.wizardData["review"]}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 text-center">
                        <PaginatedButtonGroup
                            showNumbers={true}
                            pageSize={8}>
                            {buttons}
                        </PaginatedButtonGroup>
                    </div>
                </div>
            </GraphWizardPage>
        )
    }

}