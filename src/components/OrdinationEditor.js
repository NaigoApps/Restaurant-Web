import React from 'react';
import Button from "../widgets/Button";
import ordinationsEditorActions from "../pages/evening/OrdinationsEditorActions";
import ButtonGroup from "../widgets/ButtonGroup";
import OrdersEditor from "./widgets/inputs/OrdersEditor";
import OrdinationReview from "./OrdinationReview";
import Row from "../widgets/Row";
import Column from "../widgets/Column";

export default class OrdinationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    showEditWizard() {
        ordinationsEditorActions.beginOrdinationEditing();
    }

    onWizardOk(orders) {
        ordinationsEditorActions.editOrdination(this.props.data.ordination.uuid, orders);
    }

    onWizardAbort() {
        ordinationsEditorActions.abortOrdinationEditing();
    }

    static makeOrdinationReviewDescriptor(props) {
        return {
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions,
            orders: props.ordination.orders
        }
    }

    static makeOrdersEditorDescriptor(props) {
        return {
            categories: props.categories,
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions,
            orders: props.ordination.orders
        }
    }

    getPrintButtonType() {
        if (this.props.data.ordination && this.props.data.ordination.dirty) {
            return "warning";
        }
        return "default";
    }

    render() {
        let ordersEditor;
        let ordination = this.props.data.ordination;
        if (ordination) {
            ordersEditor = <OrdinationReview data={OrdinationEditor.makeOrdinationReviewDescriptor(this.props.data)}/>;
            return <Row grow>
                <Column>
                    {ordersEditor}
                    <Row topSpaced>
                        <Column>
                            <OrdersEditor
                                data={OrdinationEditor.makeOrdersEditorDescriptor(this.props.data)}
                                visible={this.props.data.editingOrdination}
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
                        </Column>
                    </Row>
                </Column>
            </Row>;
        }
        return <div/>;
    }

    printOrdination(ordination) {
        ordinationsEditorActions.printOrdination(ordination.uuid);
    }

}