import React from 'react';
import SelectWizardPage from "../../../components/widgets/wizard/SelectWizardPage";
import DiningTablesUtils from "../tables/DiningTablesUtils";
import {DiningTablesClosingActions} from "./tableClosingFeature/DiningTablesClosingActions";
import PrintWizardModePage from "./tableClosingFeature/PrintWizardModePage";
import Wizard from "../../../components/widgets/wizard/Wizard";

export default class BillPrintWizard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        const closingFeature = data.get('tableClosingFeature');
        const bill = closingFeature.get('bill');
        const printWizard = closingFeature.get('printWizard');

        return <Wizard
            currentPage={printWizard.get('page')}
            size={"sm"}
            visible={printWizard.get('visible')}
            message="Stampa conto"
            backwardAction={() => DiningTablesClosingActions.setPrintWizardPage(printWizard.get('page') - 1)}
            forwardAction={() => DiningTablesClosingActions.setPrintWizardPage(printWizard.get('page') + 1)}
            confirmAction={() => DiningTablesClosingActions.printBill(bill.get('uuid'), printWizard.get('customer'), printWizard.get('generic'))}
            abortAction={() => DiningTablesClosingActions.abortBillPrinting()}>
            {this.buildWizardPages()}
        </Wizard>
    }

    buildWizardPages() {
        const data = this.props;
        const closingFeature = data.get('tableClosingFeature');
        const customers = data.get('customers');
        const printWizard = closingFeature.get('printWizard');

        const pages = [];
        pages.push(<PrintWizardModePage
            key="type"
            data={data}
            isValid={true}
        />);

        if (printWizard.get('isInvoice')) {
            pages.push(<SelectWizardPage
                key="customer"
                isValid={printWizard.get('customer')}
                rows={5}
                cols={3}
                id={customer => customer.get('uuid')}
                options={customers}
                renderer={customer => DiningTablesUtils.renderCustomer(customer)}
                selected={printWizard.get('customer')}
                page={printWizard.get('customerPage')}
                onSelect={uuid => DiningTablesClosingActions.selectInvoiceCustomer(uuid)}
                onDeselect={() => DiningTablesClosingActions.selectInvoiceCustomer(null)}
                onSelectPage={page => DiningTablesClosingActions.selectInvoiceCustomerPage(page)}
            />);
        }

        return pages;
    }
}