import React from 'react';
import {findByUuid, foo, uuid} from "../utils/Utils";
import {beautifyTime} from "./widgets/inputs/DateInput";
import Button from "../widgets/Button";
import ordinationsEditorActions from "../pages/evening/OrdinationsEditorActions";
import ButtonGroup from "../widgets/ButtonGroup";
import OrdersEditor from "./widgets/inputs/OrdersEditor";
import OrdinationsUtils from "../pages/evening/OrdinationsUtils";
import OrdinationReview from "./OrdinationReview";

export default class OrdinationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    showEditWizard() {
        ordinationsEditorActions.beginOrdinationEditing();
    }

    onWizardOk(orders) {
        ordinationsEditorActions.editOrdination(this.props.ordination.uuid, orders);
    }

    onWizardAbort() {
        ordinationsEditorActions.abortOrdinationEditing();
    }

    getOrdersEditor(ordination) {
        let ordersEditor;
        if (ordination) {
            ordersEditor = <OrdinationReview
                dishes={this.props.dishes}
                phases={this.props.phases}
                additions={this.props.additions}
                orders={ordination.orders}/>;
            return <div className="row">
                <div className="col-sm-12">
                    {ordersEditor}
                    <div className="row top-sep">
                        <div className="col-sm-12">
                            <OrdersEditor
                                visible={this.props.editingOrdination}
                                categories={this.props.categories}
                                dishes={this.props.dishes}
                                phases={this.props.phases}
                                additions={this.props.additions}
                                orders={this.props.ordination.orders}
                                commitAction={this.onWizardOk.bind(this)}
                                abortAction={this.onWizardAbort}/>
                            <ButtonGroup>
                                <Button text="Modifica"
                                        icon="pencil"
                                        commitAction={this.showEditWizard.bind(this)}/>
                                <Button text="Stampa"
                                        icon="print"
                                        type={this.getPrintButtonType.bind(this)()}
                                        commitAction={this.printOrdination.bind(this, ordination)}/>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>;
        }
        return <div/>;
    }

    getPrintButtonType() {
        if (this.props.ordination && this.props.ordination.dirty) {
            return "warning";
        }
        return "default";
    }

    render() {
        return this.getOrdersEditor(this.props.ordination);
    }

    printOrdination(ordination) {
        ordinationsEditorActions.printOrdination(ordination.uuid);
    }

}