import React from 'react';
import SelectWizardPage from "../../../components/widgets/wizard/SelectWizardPage";
import DiningTablesUtils from "../tables/DiningTablesUtils";
import DiningTablesClosingActions from "./tableClosingFeature/DiningTablesClosingActions";
import PrintWizardModePage from "./tableClosingFeature/PrintWizardModePage";
import Wizard from "../../../components/widgets/wizard/Wizard";
import {DataContext} from "../EveningPage";

export default class BillPrintWizard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <DataContext.Consumer>
            {value => this.buildWizard(value)}
        </DataContext.Consumer>
    }

    buildWizard(data){
        return <Wizard
            id="print-wizard"
            currentPage={this.props.page}
            size={"sm"}
            visible={this.props.visible}
            message="Stampa conto"
            backwardAction={() => DiningTablesClosingActions.setPrintWizardPage(this.props.page - 1)}
            forwardAction={() => DiningTablesClosingActions.setPrintWizardPage(this.props.page + 1)}
            confirmAction={() => this.printAction()}
            abortAction={() => DiningTablesClosingActions.abortBillPrinting()}>
            {this.buildWizardPages(data)}
        </Wizard>
    }

    buildWizardPages(data) {
        const pages = [];
        pages.push(<PrintWizardModePage
            key="type"
            isInvoice={this.props.isInvoice}
            soft={this.props.soft}
            generic={this.props.generic}
            isValid={true}
        />);

        if (this.props.isInvoice) {
            pages.push(<SelectWizardPage
                key="customer"
                isValid={!!this.props.customer}
                options={data.customers}
                renderer={customer => DiningTablesUtils.renderCustomer(customer)}
                selected={this.props.customer}
                onSelect={customer => DiningTablesClosingActions.selectInvoiceCustomer(customer)}
            />);
        }

        return pages;
    }

    printAction(){
        if(this.props.soft){
            DiningTablesClosingActions.printSoftBill(this.props.bill, this.props.generic);
        }else{
            DiningTablesClosingActions.printBill(this.props.bill, this.props.customer, this.props.generic);
        }
    }
}