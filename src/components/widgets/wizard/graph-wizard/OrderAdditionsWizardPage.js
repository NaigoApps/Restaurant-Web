import React, {Component} from 'react';
import graphWizardActions from "./GraphWizardActions";
import GraphWizardPage from "./GraphWizardPage";
import PaginatedButtonGroup from "../../../../widgets/PaginatedButtonGroup";
import OrdinationsUtils from "../../../../pages/evening/OrdinationsUtils";
import Button from "../../../../widgets/Button";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdersCrudList from "../../../../pages/evening/diningTablesEditing/ordinationsEditing/OrdersCrudList";
import ordinationsEditorActions from "../../../../pages/evening/diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import {findByUuid, findIndexByUuid} from "../../../../utils/Utils";
import PaginatedList from "../../PaginatedList";

const {List} = require('immutable');

export default class OrderAdditionsWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectGroup(sampleOrderUuid) {
        graphWizardActions.setWizardData(this.props.wizardId, sampleOrderUuid, "editing")
    }

    toggleAddition(additionUuid) {
        let wData = this.props.wizardData;
        if (wData["editing"]) {
            let addition = findByUuid(this.props.data.get('additions'), additionUuid);
            let selectedOrderUuid = wData["editing"];
            let orders = this.props.data.get('editingOrders');
            let orderIndex = orders.findIndex(order => order.get('uuid') === selectedOrderUuid);

            if(orderIndex !== -1) {
                let additionIndex = orders.get(orderIndex).get('additions').findIndex(uuid => uuid === additionUuid);
                if (additionIndex !== -1) {
                    ordinationsEditorActions.removeAddition(orderIndex, additionIndex, addition.get('price'));
                } else {
                    ordinationsEditorActions.addAddition(orderIndex, additionUuid, addition.get('price'));
                }

            }else{
                console.error("Cannot find selected order " + selectedOrderUuid);
            }
        }
    }

    canHaveAddition(dishUuid, additionUuid){
        let dish = findByUuid(this.props.data.get('dishes'), dishUuid);
        if(dish) {
            let category = findByUuid(this.props.data.get('categories'), dish.get('category'));
            if(category) {
                return category.get('additions').includes(additionUuid);
            }
        }
        return false;
    }

    render() {
        let props = this.props;
        let selectedOrderUuid = props.wizardData["editing"];
        let orders = props.data.get('editingOrders');
        let selectedOrder = null;
        if(orders) {
            selectedOrder = orders.find(order => order.get('uuid') === selectedOrderUuid);
        }

        let availableAdditions = props.data.get('additions');

        if(selectedOrder){
            availableAdditions = availableAdditions
                .filter(addition => addition.get('generic') ||
                    selectedOrder.get('additions').includes(addition.get('uuid')) ||
                    this.canHaveAddition(selectedOrder.get('dish'), addition.get('uuid')))
        }

        return (
            <GraphWizardPage
                abortAction={props.abortAction}
                confirmAction={props.confirmAction}>
                <Row grow>
                    <Column sm="5">
                        <OrdersCrudList
                            data={this.props.data}
                            selectedOrder={selectedOrderUuid}
                            commitAction={this.selectGroup.bind(this)}
                        />
                    </Column>
                    <Column sm="7">
                        <PaginatedList
                            id={addition => addition.get('uuid')}
                            rows={8}
                            cols={2}
                            selected={selectedOrder ? selectedOrder.get('additions') : List()}
                            entities={availableAdditions}
                            renderer={addition => addition.get('name')}
                            selectMethod={addition => this.toggleAddition(addition)}
                            deselectMethod={addition => this.toggleAddition(addition)}
                            multiSelect
                        />
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}