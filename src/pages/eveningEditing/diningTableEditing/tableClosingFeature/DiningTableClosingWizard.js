import React from 'react';
import Wizard from "../../../../components/widgets/wizard/Wizard";
import DiningTableClosingModePage from "./DiningTableClosingModePage";
import DiningTableClosingSplitPage from "./DiningTableClosingSplitPage";
import DiningTableClosingReviewPage from "./DiningTableClosingReviewPage";
import {iGet} from "../../../../utils/Utils";
import {DiningTablesClosingActions} from "./DiningTablesClosingActions";
import {DiningTableClosingWizardPages} from "./TableClosingFeatureStore";

export const INVOICE = "INVOICE";
export const RECEIPT = "RECEIPT";

export default class DiningTableClosingWizard extends React.Component {
    constructor(props) {
        super(props);
    }

    confirmInvoice() {
        let data = this.props;
        let bill = iGet(data, "tableClosingFeature.bill");
        this.props.confirmAction(bill);
    }

    render() {
        let data = this.props;
        let wizardData = iGet(data, "tableClosingFeature.closingWizard");
        let wizardPages = this.buildWizardPages();
        let page = wizardData.get('page');
        let pages = wizardData.get('pages');
        return <Wizard
            abortAction={() => DiningTablesClosingActions.abortClosing()}
            confirmAction={() => this.confirmInvoice()}
            backwardAction={() => DiningTablesClosingActions.backward()}
            forwardAction={() => DiningTablesClosingActions.forward()}
            visible={wizardData.get('visible')}
            currentPage={page}
            renderer={data => ""}
            size={pages.size > page && pages.get(page) === DiningTableClosingWizardPages.MODE_PAGE ? "sm" : "lg"}>
            {wizardPages}
        </Wizard>;
    }

    buildWizardPages() {
        let data = this.props;
        let wizardData = iGet(data, "tableClosingFeature.closingWizard");
        let pages = [];
        if (wizardData && wizardData.get('visible')) {
            if (wizardData.get('pages').includes(DiningTableClosingWizardPages.MODE_PAGE)) {
                pages.push(<DiningTableClosingModePage
                    isValid={true}
                    key="mode_page"
                    title="Selezionare il tipo di conto"
                    data={data}
                    wizardData={wizardData}
                />);
            }
            let invoiceOrders = iGet(data, 'tableClosingFeature.bill.orders');
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