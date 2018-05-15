import React, {Component} from 'react';
import GraphWizardPage from "./GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import {findByUuid, iGet} from "../../../../utils/Utils";
import {OrdersActions} from "../../../../pages/eveningsEditing/diningTablesEditing/ordinationsEditing/ordersEditing/OrdersActions";
import SelectInput from "../../inputs/SelectInput";
import FloatInput from "../../inputs/float/FloatInput";
import OrdinationOrdersCrudList
    from "../../../../pages/eveningsEditing/diningTablesEditing/ordinationsEditing/OrdinationOrdersCrudList";
import TextEditor from "../../inputs/TextEditor";
import FloatEditor from "../../inputs/float/FloatEditor";
import IntegerEditor from "../../inputs/IntegerEditor";
import OrdinationsUtils from "../../../../pages/eveningsEditing/OrdinationsUtils";

const {List} = require('immutable');

export const AdditionPages = {
    FIXED: "FIXED",
    FREE: "FREE",
    PRICE: "PRICE"
};

export default class OrderAdditionsWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    canHaveAddition(dishUuid, additionUuid) {
        let dish = findByUuid(this.props.data.get('dishes'), dishUuid);
        if (dish) {
            let category = findByUuid(this.props.data.get('categories'), dish.get('category'));
            if (category) {
                return category.get('additions').includes(additionUuid);
            }
        }
        return false;
    }

    render() {
        let props = this.props;
        let data = this.props.data;

        let availablePhases = data.get('phases');
        let orders = iGet(data, "ordersEditing.orders");
        let selectedOrderUuid = iGet(data, "ordersEditing.selectedOrder");
        let selectedPhase = iGet(data, "ordersEditing.selectedPhase");
        let selectedOrder = null;
        if (orders) {
            selectedOrder = findByUuid(orders, selectedOrderUuid);
        }

        let additionTypePage = iGet(data, "ordersEditing.additionTypePage");

        let content = this.buildContent();

        return (
            <GraphWizardPage
                abortAction={props.abortAction}
                confirmAction={props.confirmAction}>
                <Row grow>
                    <Column sm="5">
                        <Row grow>
                            <Column>
                                <OrdinationOrdersCrudList
                                    data={this.props.data}
                                    orders={orders}
                                    trashAction={grp => OrdersActions.removeGroup(grp)}
                                    commitAction={(grp) => OrdersActions.selectGroup(grp)}
                                />
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <SelectInput
                                    rows={1}
                                    cols={4}
                                    id={phase => phase.get('uuid')}
                                    options={availablePhases}
                                    renderer={phase => phase.get('name')}
                                    selected={selectedPhase}
                                    page={0}
                                    onSelect={phase => OrdersActions.selectPhase(phase)}/>
                            </Column>
                        </Row>
                    </Column>
                    <Column sm="7">
                        {content}
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

    buildContent() {
        let data = this.props.data;
        let additionsPage = iGet(data, "ordersEditing.additionsPage");
        let availableAdditions = data.get('additions');

        let orders = iGet(data, "ordersEditing.orders");
        let selectedOrderUuid = iGet(data, "ordersEditing.selectedOrder");
        let selectedOrder = null;
        if (orders) {
            selectedOrder = findByUuid(orders, selectedOrderUuid);
        }


        if (selectedOrder) {
            availableAdditions = availableAdditions
                .filter(addition => addition.get('generic') ||
                    selectedOrder.get('additions').includes(addition.get('uuid')) ||
                    this.canHaveAddition(selectedOrder.get('dish'), addition.get('uuid')))
        } else {
            availableAdditions = List();
        }

        let freeAdditionText = selectedOrder ? selectedOrder.get('notes') : "";

        return <Row>
            <Column>
                <Row>
                    <Column>
                        <TextEditor
                            disabled={!selectedOrder}
                            options={{
                                label: "Variante libera",
                                value: freeAdditionText,
                                callback: result => OrdersActions.setFreeAddition(result)
                            }}
                        />
                    </Column>
                    <Column>
                        <FloatEditor
                            disabled={!selectedOrder}
                            options={{
                                label: "Prezzo",
                                value: selectedOrder ? selectedOrder.get('price') : 0,
                                callback: result => OrdersActions.setPrice(result)
                            }}
                        />
                    </Column>
                    <Column>
                        <IntegerEditor
                            disabled={!selectedOrder}
                            options={{
                                label: "Quantità",
                                value: selectedOrder ? OrdinationsUtils.countOrders(orders, selectedOrder) : 0,
                                callback: result => OrdersActions.setQuantity(result)
                            }}
                        />
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column><h5>Varianti fisse</h5></Column>
                </Row>
                <Row ofList>
                    <Column>
                        <SelectInput
                            uuid="order_free_additions"
                            rows={7}
                            cols={2}
                            id={addition => addition.get('uuid')}
                            options={availableAdditions}
                            renderer={addition => addition.get('name')}
                            selected={selectedOrder ? selectedOrder.get('additions') : List()}
                            page={additionsPage}
                            onSelectPage={page => OrdersActions.selectAdditionPage(page)}
                            onSelect={addition => OrdersActions.toggleAddition(addition)}
                            onDeselect={addition => OrdersActions.toggleAddition(addition)}
                            multiSelect
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    buildPriceContent() {
        let data = this.props.data;
        let orders = iGet(data, "ordersEditing.orders");
        let selectedOrderUuid = iGet(data, "ordersEditing.selectedOrder");
        let selectedOrder = null;
        if (orders) {
            selectedOrder = findByUuid(orders, selectedOrderUuid);
        }
        let freeAdditionText = selectedOrder ? selectedOrder.get('notes') : "";
        return <Row>
            <Column>
                <FloatInput
                    uuid="orders_price"
                    text={iGet(data, "ordersEditing.priceInput.text")}
                    onChar={char => OrdersActions.priceChar(char)}
                />
            </Column>
            <Column>
                <SelectInput
                    id={phase => phase.get('uuid')}
                    rows={2}
                    cols={2}
                    page={0}
                    selected={selectedOrder ? selectedOrder.get('phase') : null}
                    options={data.get('phases')}
                    renderer={phase => phase.get('name')}
                    onSelect={phase => OrdersActions.editOrderPhase(phase)}
                />
            </Column>
        </Row>;
    }
}