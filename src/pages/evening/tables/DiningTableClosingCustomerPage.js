import React, {Component} from 'react';
import GraphWizardPage from "../../../components/widgets/wizard/graph-wizard/GraphWizardPage";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import InfoPaginatedList from "../../../components/widgets/InfoPaginatedList";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import CustomerInfoPanel from "./CustomerInfoPanel";
import diningTableClosingWizardStore from "../DiningTableClosingWizardStore";
import diningTablesEditorActions from "./DiningTablesEditorActions";

export default class DiningTableClosingCustomerPage extends Component {
    constructor(props) {
        super(props);
    }

    selectCustomer(uuid){
        diningTablesEditorActions.selectInvoiceCustomer(uuid);
    }

    render() {
        return (
            <GraphWizardPage
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}>
                <Row grow>
                    <Column>
                        <InfoPaginatedList
                            rows={6}
                            selected={this.props.wizardData.get('customer')}
                            entities={this.props.data.get('customers')}
                            renderer={customer => EntitiesUtils.renderCustomer(customer)}
                            selectMethod={(customer) => this.selectCustomer(customer)}>
                            <CustomerInfoPanel/>
                        </InfoPaginatedList>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}