import React, {Component} from 'react';
import {TYPES} from "../../components/editors/EntityEditor";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import PaginatedList from "../../components/widgets/PaginatedList";
import customersEditorActions from "./CustomersEditorActions";
import customersCreatorActions from "./CustomerCreatorActions";

export default class CustomersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <PaginatedList
                        id={customer => customer.get('uuid')}
                        entities={props.get('customers')}
                        renderer={printer => printer.get('surname') + " " + printer.get('name')}
                        selectMethod={customersEditorActions.selectCustomer}
                        deselectMethod={customersEditorActions.deselectCustomer}
                    />
                </Column>
            </Row>,
            <Row key="new" topSpaced>
                <Column>
                    <Button key="new"
                            text="Nuovo cliente"
                            type="info"
                            commitAction={customersCreatorActions.beginCustomerCreation}
                    />
                </Column>
            </Row>];
    }

}