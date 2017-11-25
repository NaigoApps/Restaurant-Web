import React from 'react';
import {findByUuid, foo} from "../utils/Utils";
import {beautifyTime} from "./widgets/inputs/DateInput";
import Button from "../widgets/Button";
import ordinationsEditorActions from "../pages/evening/OrdinationsEditorActions";
import ButtonGroup from "../widgets/ButtonGroup";
import OrdersEditor from "./widgets/inputs/OrdersEditor";

export default class OrdinationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    onWizardOk(orders){
        ordinationsEditorActions.editOrdination(this.props.ordination.uuid, orders);
    }

    onWizardAbort(){

    }

    implode(orders) {
        let result = new Map();
        orders.forEach(order => {
            let found = false;
            let phaseOrders = result.get(order.phase);
            if (!phaseOrders) {
                phaseOrders = [];
                result.set(order.phase, phaseOrders);
            }
            this.addOrder(phaseOrders, order);
        });
        return result;
    }

    addOrder(orders, order) {
        let found = false;
        orders.forEach(o => {
            if (this.areTheSame(o.order, order)) {
                o.quantity++;
                found = true;
            }
        });
        if (!found) {
            orders.push({
                order: order,
                quantity: 1
            })
        }
    }

    areTheSame(o1, o2) {
        if (o1.dish !== o2.dish) {
            return false;
        }
        if (o1.notes || o2.notes) {
            return false;
        }
        let ok = true;
        o1.additions.forEach(a => {
            if (!o2.additions.includes(a)) {
                ok = false;
            }
        });
        o2.additions.forEach(a => {
            if (!o1.additions.includes(a)) {
                ok = false;
            }
        });
        return ok;
    }

    showEditWizard(){
        ordinationsEditorActions.beginOrdinationEditing();
    }

    getOrdersEditor(ordination) {
        let phasesComponents = [];
        if(ordination) {
            let phaseOrders = this.implode(ordination.orders);
            let ordersEditor = phaseOrders.forEach((orders, phase) => {
                let separator = "";
                let ordersRenderer = orders
                    .sort((o1, o2) => findByUuid(this.props.dishes, o1.order.dish).name
                        .localeCompare(findByUuid(this.props.dishes, o2.order.dish).name))
                    .map(o => {
                        let result = <span className="clickable">{separator}{o.quantity}
                            X {findByUuid(this.props.dishes, o.order.dish).name}</span>;
                        separator = ", ";
                        return result;
                    });
                phasesComponents.push(<div className="row top-sep">
                    <div className="col-sm-12">
                        <div><b>{findByUuid(this.props.phases, phase).name}</b></div>
                        {ordersRenderer}
                    </div>
                </div>);
            });
        }
        return <div className="row">
            <div className="col-sm-12">
                {phasesComponents}
                <div className="row top-sep">
                    <div className="col-sm-12">
                        <ButtonGroup>
                            <OrdersEditor
                                autoShow={this.props.editingOrdination}
                                categories={this.props.categories}
                                dishes={this.props.dishes}
                                phases={this.props.phases}
                                orders={this.props.ordination.orders}
                                commitAction={this.onWizardOk.bind(this)}
                                abortAction={this.onWizardAbort}/>
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

    getPrintButtonType(){
        if(this.props.ordination && this.props.ordination.dirty){
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