import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import Wizard from "../../../components/widgets/wizard/Wizard";
import diningTableClosingWizardStore from "../DiningTableClosingWizardStore";
import DiningTableClosingModePage from "./DiningTableClosingModePage";
import DiningTableClosingSplitPage from "./DiningTableClosingSplitPage";
import DiningTableClosingCustomerPage from "./DiningTableClosingCustomerPage";
import DiningTablesUtils from "./DiningTablesUtils";
import DiningTableClosingReviewPage from "./DiningTableClosingReviewPage";

export const INVOICE = "INVOICE";
export const RECEIPT = "RECEIPT";

export default class DiningTableClosingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = diningTableClosingWizardStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        diningTableClosingWizardStore.addChangeListener(this.updateState);
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        diningTableClosingWizardStore.removeChangeListener(this.updateState);
    }


    abortDiningTableClosing() {
        diningTablesEditorActions.abortDiningTableClosing();
    }

    confirmInvoice() {
        let table = this.props.data.get('editingTable');
        let tableUuid = table.get('uuid');
        let type = this.state.wizardData.get('type');
        let split = this.state.wizardData.get('split');
        let orders = [];
        if (this.state.wizardData.get('quick')) {
            orders = DiningTablesUtils.findTableOpenedOrders(table).map(order => order.get('uuid'));
        } else {
            orders = this.state.wizardData.get('orders');
        }
        let total = this.state.wizardData.get('finalTotal');
        let coverCharges = this.state.wizardData.get('coverCharges');
        let customer = type === INVOICE ? this.state.wizardData.get('customer') : null;
        if (split) {
            total *= split;
        }
        diningTablesEditorActions.createBill(tableUuid, orders, total, coverCharges, customer);
    }

    backward() {
        diningTablesEditorActions.closingWizardBackward();
    }

    forward(pages) {
        diningTablesEditorActions.closingWizardForward(pages);
    }

    render() {
        let wizardPages = this.buildWizardPages();
        return <Wizard
            abortAction={this.abortDiningTableClosing}
            confirmAction={(pages) => this.confirmInvoice()}
            backwardAction={() => this.backward()}
            forwardAction={(pages) => this.forward(pages)}
            visible={!!this.state.wizardData}
            currentPage={this.state.currentPage}
            wizardData={this.state.wizardData}
            isValid={() => this.isInvoiceValid()}
            isWizardValid={(page, data) => true}
            renderer={data => ""}
            size="lg"
            hideForm>
            {wizardPages}
        </Wizard>;
    }

    buildWizardPages() {
        let pages = [];
        if (this.state.wizardData) {
            pages.push(<DiningTableClosingModePage
                key="mode_page"
                title="Selezionare il tipo di conto"
                data={this.props.data}
                isValid={this.state.wizardData.get('type')}
                wizardData={this.state.wizardData}
            />);
            if (this.state.wizardData.get('type') === INVOICE) {
                pages.push(<DiningTableClosingCustomerPage
                    key="customers_page"
                    title="Selezionare il cliente"
                    data={this.props.data}
                    isValid={this.state.wizardData.get('customer')}
                    wizardData={this.state.wizardData}
                />);
            }
            if (!this.state.wizardData.get('quick')) {
                pages.push(<DiningTableClosingSplitPage
                    key="split_page"
                    title="Selezionare gli ordini da includere nel conto"
                    data={this.props.data}
                    isValid={this.state.wizardData.get('orders') && this.state.wizardData.get('orders').size > 0}
                    wizardData={this.state.wizardData}
                />);
            }
            pages.push(<DiningTableClosingReviewPage
                key="review_page"
                title="Riepilogo"
                data={this.props.data}
                isValid={this.state.wizardData.get('orders') && this.state.wizardData.get('orders').size > 0}
                wizardData={this.state.wizardData}
            />);
        }
        return pages;
    }

    isInvoiceValid() {
        return this.state.get('orders') && this.state.get('orders').length > 0;
    }

}