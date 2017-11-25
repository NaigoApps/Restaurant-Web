import React, {Component} from 'react';
import graphWizardActions from "../GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import OrdinationEditor from "../../../OrdinationEditor";
import OrdinationReview from "../../../OrdinationReview";
import EntitySelector from "../../../../widgets/EntitySelector";
import QuantitySelector from "../../../../widgets/QuantitySelector";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";

export default class OrderCategoryWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    setQuantity(value) {
        graphWizardActions.setWizardData(value, "quantity");
    }

    setPhase(value) {
        graphWizardActions.setWizardData(value, "phases");
    }

    selectOption(option) {
        let newCategory = option.uuid;
        if (this.props.wizardData["category"] === newCategory) {
            newCategory = null;
        }
        graphWizardActions.setWizardData(newCategory, this.props.identifier);
        graphWizardActions.setWizardData(null, "dishes");
        if(!this.props.wizardData["phases"]){
            graphWizardActions.setWizardData(this.props.phases[0].uuid, "phases");
        }
        if(!this.props.wizardData["quantity"]){
            graphWizardActions.setWizardData(1, "quantity");
        }
        graphWizardActions.movePage("dishes");
    }


    optionButtonClass(opt) {
        let classes = ["btn", "btn-lg"];
        classes.push(opt.uuid === this.props.wizardData["categories"] ? "btn-primary" : "btn-default");
        return classes.join(" ");
    }

    render() {

        let buttons = this.props.options(this.props.wizardData).map(o => {
            return (
                <button key={o.uuid}
                        type="button"
                        className={this.optionButtonClass(o)}
                        onClick={this.selectOption.bind(this, o)}>
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