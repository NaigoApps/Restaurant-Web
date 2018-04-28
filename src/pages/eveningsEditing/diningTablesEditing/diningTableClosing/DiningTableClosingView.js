import React from 'react';
import Wizard from "../../../../components/widgets/wizard/Wizard";
import DiningTableClosingModePage from "./DiningTableClosingModePage";
import DiningTableClosingSplitPage from "./DiningTableClosingSplitPage";
import DiningTableClosingCustomerPage from "./DiningTableClosingCustomerPage";
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import DiningTableClosingReviewPage from "./DiningTableClosingReviewPage";
import {iGet} from "../../../../utils/Utils";
import {DiningTablesEditorActions} from "../DiningTablesEditorActions";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";

export const INVOICE = "INVOICE";
export const RECEIPT = "RECEIPT";

export default class DiningTableClosingView extends React.Component {
    constructor(props) {
        super(props);
    }

    confirmInvoice() {
        let data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");
        let tableUuid = table.get('uuid');
        let closingData = iGet(data, "diningTableClosing");
        let type = closingData.get('type');
        let split = iGet(closingData, 'splitInput.value');
        let orders = [];
        if (closingData.get('quick')) {
            orders = DiningTablesUtils.findTableOpenedOrders(table).map(order => order.get('uuid'));
        } else {
            orders = closingData.get('orders');
        }
        let total = iGet(closingData, 'finalTotalInput.value');
        let coverCharges = closingData.get('coverCharges');
        let customer = type === INVOICE ? closingData.get('customer') : null;
        if (split) {
            total *= split;
        }
        DiningTablesClosingActions.createBill(tableUuid, orders, total, coverCharges, customer);
    }

    render() {
        let data = this.props.data;
        let wizardData = iGet(data, "diningTableClosing");
        let wizardPages = this.buildWizardPages();
        let page = wizardData.get('page');
        return <Wizard
            abortAction={() => DiningTablesClosingActions.abortClosing()}
            confirmAction={() => this.confirmInvoice()}
            backwardAction={() => DiningTablesClosingActions.backward()}
            forwardAction={() => DiningTablesClosingActions.forward()}
            visible={this.props.visible}
            currentPage={page}
            wizardData={wizardData}
            isValid={() => this.isInvoiceValid()}
            isWizardValid={(page, data) => true}
            renderer={data => ""}
            size={page === 0 ? "sm" : "lg"}
            hideForm>
            {wizardPages}
        </Wizard>;
    }

    buildWizardPages() {
        let data = this.props.data;
        let wizardData = iGet(data, "diningTableClosing");
        let pages = [];
        if (wizardData) {
            pages.push(<DiningTableClosingModePage
                key="mode_page"
                title="Selezionare il tipo di conto"
                data={data}
                isValid={wizardData.get('type')}
                wizardData={wizardData}
            />);
            if (wizardData.get('type') === INVOICE) {
                pages.push(<DiningTableClosingCustomerPage
                    key="customers_page"
                    title="Selezionare il cliente"
                    data={data}
                    isValid={wizardData.get('customer')}
                    wizardData={wizardData}
                />);
            }
            if (!wizardData.get('quick')) {
                pages.push(<DiningTableClosingSplitPage
                    key="split_page"
                    title="Selezionare gli ordini da includere nel conto"
                    data={data}
                    isValid={wizardData.get('orders') && wizardData.get('orders').size > 0}
                    wizardData={wizardData}
                />);
            }
            pages.push(<DiningTableClosingReviewPage
                key="review_page"
                title="Riepilogo"
                data={data}
                isValid={wizardData.get('orders') && wizardData.get('orders').size > 0}
                wizardData={wizardData}
            />);
        }
        return pages;
    }

    isInvoiceValid() {
        return this.state.get('orders') && this.state.get('orders').length > 0;
    }

}