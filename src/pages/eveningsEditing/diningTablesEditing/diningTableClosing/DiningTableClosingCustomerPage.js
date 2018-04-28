import React, {Component} from 'react';
import GraphWizardPage from "../../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import InfoSelectInput from "../../../../components/widgets/InfoSelectInput";
import {EntitiesUtils} from "../../../../utils/EntitiesUtils";
import CustomerInfoPanel from "../../tables/CustomerInfoPanel";
import {DiningTablesEditorActions} from "../DiningTablesEditorActions";
import SelectInput from "../../../../components/widgets/inputs/SelectInput";
import {findByUuid, iGet} from "../../../../utils/Utils";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";

export default class DiningTableClosingCustomerPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let wizardData = this.props.data.get('diningTableClosing');

        let customer = findByUuid(this.props.data.get('customers'), wizardData.get('customer'));

        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row grow>
                    <Column>
                        <SelectInput

                            id={customer => customer.get('uuid')}
                            rows={6}
                            page={iGet(wizardData, "customerPage")}
                            selected={iGet(wizardData, "customer")}
                            options={this.props.data.get('customers')}
                            renderer={customer => EntitiesUtils.renderCustomer(customer)}

                            onSelect={uuid=> DiningTablesClosingActions.selectInvoiceCustomer(uuid)}
                            onDeselect={() => DiningTablesClosingActions.selectInvoiceCustomer(null)}
                            onSelectPage={index => DiningTablesClosingActions.selectInvoiceCustomerPage(index)}>
                        </SelectInput>
                    </Column>
                    <Column sm="2">
                        <CustomerInfoPanel customer={customer}/>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}