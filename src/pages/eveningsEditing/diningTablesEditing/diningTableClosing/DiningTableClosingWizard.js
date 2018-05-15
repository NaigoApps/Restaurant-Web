import React from 'react';
import Wizard from "../../../../components/widgets/wizard/Wizard";
import DiningTableClosingModePage from "./DiningTableClosingModePage";
import DiningTableClosingSplitPage from "./DiningTableClosingSplitPage";
import DiningTablesUtils from "../../tables/DiningTablesUtils";
import DiningTableClosingReviewPage from "./DiningTableClosingReviewPage";
import {iGet} from "../../../../utils/Utils";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";
import {DiningTableClosingWizardPages} from "./DiningTableClosingStore";

export const INVOICE = "INVOICE";
export const RECEIPT = "RECEIPT";

export default class DiningTableClosingWizard extends React.Component {
    constructor(props) {
        super(props);
    }

    confirmInvoice() {
        let data = this.props.data;
        let bill = iGet(data, "diningTableClosing.selectedBill");
        this.props.confirmAction(bill);
    }

    render() {
        let data = this.props.data;
        let wizardData = iGet(data, "diningTableClosing");
        let wizardPages = this.buildWizardPages();
        let page = wizardData.get('page');
        let pages = wizardData.get('pages');
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
            size={pages.length > page && pages[page] === DiningTableClosingWizardPages.MODE_PAGE ? "sm" : "lg"}
            hideForm>
            {wizardPages}
        </Wizard>;
    }

    buildWizardPages() {
        let data = this.props.data;
        let wizardData = iGet(data, "diningTableClosing");
        let pages = [];
        if (wizardData) {
            if (wizardData.get('pages').includes(DiningTableClosingWizardPages.MODE_PAGE)) {
                pages.push(<DiningTableClosingModePage
                    key="mode_page"
                    title="Selezionare il tipo di conto"
                    data={data}
                    wizardData={wizardData}
                />);
            }
            // if (wizardData.get('type') === INVOICE) {
            //     pages.push(<DiningTableClosingCustomerPage
            //         key="customers_page"
            //         title="Selezionare il cliente"
            //         data={data}
            //         isValid={wizardData.get('customer')}
            //         wizardData={wizardData}
            //     />);
            // }

            let invoiceOrders = iGet(wizardData, 'selectedBill.orders');
            if (wizardData.get('pages').includes(DiningTableClosingWizardPages.SPLIT_PAGE)) {
                pages.push(<DiningTableClosingSplitPage
                    key="split_page"
                    title="Selezionare gli ordini da includere nel conto"
                    data={data}
                    isValid={invoiceOrders && invoiceOrders.size > 0}
                    wizardData={wizardData}
                />);
            }
            if (wizardData.get('pages').includes(DiningTableClosingWizardPages.REVIEW_PAGE)) {
                pages.push(<DiningTableClosingReviewPage
                    key="review_page"
                    title="Riepilogo"
                    data={data}
                    isValid={invoiceOrders && invoiceOrders.size > 0}
                    wizardData={wizardData}
                />);
            }
        }
        return pages;
    }

}