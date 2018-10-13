import React, {Component} from 'react';
import {TYPES} from "../../components/editors/EntityEditor";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";
import CustomersPageActions from "./CustomersPageActions";

export default class CustomersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        rows={StoresUtils.option(data, "customersRows", 3)}
                        cols={StoresUtils.option(data, "customersColumns", 3)}
                        options={data.data.customers}
                        page={data.navigator.page}
                        renderer={customer => EntitiesUtils.renderCustomer(customer)}
                        onSelectPage={index => CustomersPageActions.selectCustomerPage(index)}
                        onSelect={customer => CustomersPageActions.selectCustomer(customer)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" align="center">
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuovo cliente"
                                 type="success"
                                 commitAction={() => CustomersPageActions.beginCustomerCreation()}
                    />
                </Column>
            </Row>];
    }

}