import React from 'react';
import OrdinationsUtils from "../OrdinationsUtils";
import Scrollable from "../../../components/widgets/Scrollable";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import DiningTablesUtils from "./DiningTablesUtils";
import OrdinationReviewComponent from "../diningTableEditing/ordinationsEditing/review/OrdinationReviewComponent";
import OrderGroupReviewComponent from "../diningTableEditing/ordinationsEditing/review/OrderGroupReviewComponent";
import CRUDStatus from "../../../utils/CRUDStatus";
import OrdinationsEditorActions from "../diningTableEditing/ordinationsEditing/OrdinationsEditorActions";
import OkCancelModal from "../../../widgets/OkCancelModal";
import {DiningTableEditorTabs} from "../diningTableEditing/DiningTableEditorStore";
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import DiningTablesEditorActions from "../diningTableEditing/DiningTablesEditorActions";
import DiningTableBillsReview from "./DiningTableBillsReview";

import {ApplicationContext} from "../../Page";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ApplicationContext.Consumer>
            {value => this.buildContent(value)}
        </ApplicationContext.Consumer>;
    }

    buildContent(general) {
        let props = this.props;
        let table = props.currentTable;

        let reviewContent;
        if (props.tab === DiningTableEditorTabs.ORDINATIONS) {
            reviewContent = this.buildDetailedReview(general);
        } else if (props.tab === DiningTableEditorTabs.REVIEW) {
            reviewContent = this.buildReview(general);
        } else {
            reviewContent = <DiningTableBillsReview
                {...this.props.billsEditing}
                table={table}/>;
        }
        return <Row grow>
            <Column>
                {reviewContent}
            </Column>
        </Row>
    }

    buildReview(general) {
        const table = this.props.currentTable;

        let allOrders = table.listOrders();

        let coverChargesPrice = 0;
        let coverChargesComponent;

        if(general.settings.coverCharges){
            coverChargesComponent = this.buildCoverChargesComponent();
            coverChargesPrice = table.getCoverChargesPrice();
        }

        let total = OrdinationsUtils.total(allOrders) + coverChargesPrice;

        const groups = DiningTablesUtils.implode(table.listOrders());
        return <Row grow>
            <Column>
                <Scrollable>
                    {coverChargesComponent}
                    {groups.map(group =>
                        <OrderGroupReviewComponent key={group.groupId} group={group}/>)}
                </Scrollable>
                <Row>
                    <Column>
                        <h5><b>TOTALE: <span>{OrdinationsUtils.formatPrice(total)}</span></b></h5>
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    buildCoverChargesComponent() {
        const table = this.props.currentTable;

        let ccs = table.coverCharges;
        let ccsText = ccs.toString() + ((ccs > 1) ? " COPERTI" : " COPERTO");
        let ccsPrice = ccs * table.evening.coverCharge;
        return <Row>
            <Column auto>{ccsText}</Column>
            <Column/>
            <Column auto>{OrdinationsUtils.formatPrice(ccsPrice)}</Column>
        </Row>
    }

    buildDetailedReview(general) {
        const table = this.props.currentTable;

        let allOrders = table.listOrders();

        let coverChargesPrice = 0;
        let coverChargesEditor;

        if(general.settings.coverCharges){
            coverChargesEditor = this.buildCoverChargesEditor();
            coverChargesPrice = table.getCoverChargesPrice();
        }

        let total = OrdinationsUtils.total(allOrders) + coverChargesPrice;

        const components = table.ordinations.map(ordination =>
            <Row key={ordination.uuid} bitSpaced>
                <Column>
                    <OrdinationReviewComponent
                        title={OrdinationsUtils.renderOrdination(ordination)}
                        options={this.props.ordinationEditing.options}
                        data={this.props.data}
                        ordination={ordination}
                    />
                </Column>
            </Row>);

        return <Row grow>
            <Column>
                <Scrollable position={this.props.scrollReview}>
                    {coverChargesEditor}
                    {components}
                </Scrollable>
                <Row>
                    <Column>
                        <h5><b>TOTALE: <span>{OrdinationsUtils.formatPrice(total)}</span></b></h5>
                    </Column>
                </Row>
                <OkCancelModal
                    message="Eliminare la comanda?"
                    confirmType="danger"
                    abortType="secondary"
                    visible={this.props.ordinationEditing.crudStatus === CRUDStatus.DELETE}
                    confirmAction={() => OrdinationsEditorActions.deleteOrdination(this.props.ordinationEditing.currentOrdination)}
                    abortAction={() => OrdinationsEditorActions.abortOrdinationDeletion()}
                />
                <OkCancelModal
                    message="Inviare annullamento comanda?"
                    confirmType="danger"
                    abortType="secondary"
                    visible={this.props.ordinationEditing.aborting}
                    confirmAction={() => OrdinationsEditorActions.abortOrdination(this.props.ordinationEditing.currentOrdination)}
                    abortAction={() => OrdinationsEditorActions.abortOrdinationAbortion()}
                />
            </Column>
        </Row>
    }

    buildCoverChargesEditor(){
        const table = this.props.currentTable;

        let coverCharges = table.coverCharges;
        let coverChargesPrice = coverCharges * table.evening.coverCharge;

        return <Row align="center">
            <Column auto>
                <IntegerEditor
                    options={{
                        label: "Coperti",
                        value: table.coverCharges,
                        min: 0,
                        callback: ccs => DiningTablesEditorActions.updateCoverCharges(table, ccs)
                    }}
                />
            </Column>
            <Column/>
            <Column auto>
                {OrdinationsUtils.formatPrice(coverChargesPrice)}
            </Column>

        </Row>
    }
}