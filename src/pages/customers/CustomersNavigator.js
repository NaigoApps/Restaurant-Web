import React, {Component} from 'react';
import {TYPES} from "../../components/editors/EntityEditor";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import {CustomersEditorActions} from "./CustomersEditorActions";
import {CustomersCreatorActions} from "./CustomerCreatorActions";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class CustomersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        rows={StoresUtils.settings(data, "customersRows", 3)}
                        cols={StoresUtils.settings(data, "customersColumns", 3)}
                        id={customer => customer.get('uuid')}
                        options={data.get('customers')}
                        page={data.get('page')}
                        renderer={customer => EntitiesUtils.renderCustomer(customer)}
                        onSelectPage={index => CustomersEditorActions.selectCustomersPage(index)}
                        onSelect={addition => CustomersEditorActions.selectCustomer(addition)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" align="center">
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuovo cliente"
                                 type="success"
                                 commitAction={() => CustomersCreatorActions.beginCustomerCreation()}
                    />
                </Column>
            </Row>];
    }

}