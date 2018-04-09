import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import Button from "../../../widgets/Button";
import {iGet, uuid} from "../../../utils/Utils";
import OrdinationsUtils from "../OrdinationsUtils";
import Scrollable from "../../../components/widgets/Scrollable";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import DiningTablesUtils from "./DiningTablesUtils";
import FormattedParagraph from "../../../widgets/FormattedParagraph";
import ordinationsEditorActions from "../diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import {OrdinationsCreatorActions} from "../diningTablesEditing/ordinationsEditing/OrdinationsCreatorActions";
import {NEW_ORDINATION_UUID} from "../../../utils/EntitiesUtils";
import OrdinationCreator from "../diningTablesEditing/ordinationsEditing/OrdinationCreator";
import OrdinationEditor from "../diningTablesEditing/ordinationsEditing/OrdinationEditor";
import ConfirmModal from "../../../widgets/ConfirmModal";
import PaginatedList from "../../../components/widgets/PaginatedList";
import eveningEditorActions from "../EveningEditorActions";
import GraphWizard from "../../../components/widgets/wizard/graph-wizard/GraphWizard";
import SelectWizardPage from "../../../components/widgets/wizard/SelectWizardPage";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletingOrdination: false,
            deletingDiningTable: false,
            mergingDiningTable: false
        }
    }

    showDeleteDiningTableModal() {
        this.setState({
            deletingDiningTable: true
        });
    }

    showMergeDiningTableModal() {
        this.setState({
            mergingDiningTable: true
        });
    }

    doDeleteDiningTable() {
        this.setState({
            deletingDiningTable: false
        });
        eveningEditorActions.deleteEveningDiningTable(iGet(this.props.data, "diningTablesEditing.diningTable.uuid"));
    }

    doMergeDiningTable(data) {
        this.setState({
            mergingDiningTable: false
        });
        eveningEditorActions.mergeDiningTable(iGet(this.props.data, "diningTablesEditing.diningTable.uuid"), data.get('uuid'))
    }

    hideDeleteDiningTableModal() {
        this.setState({
            deletingDiningTable: false
        });
    }

    hideMergeDiningTableModal() {
        this.setState({
            mergingDiningTable: false
        });
    }

    showDeleteOrdinationModal() {
        this.setState({
            deletingOrdination: true
        });
    }

    doDeleteOrdination() {
        this.setState({
            deletingOrdination: false
        });
        diningTablesEditorActions.deleteDiningTableOrdination(this.props.data.get('editingTable').get('uuid'),
            this.props.data.get('editingOrdination').get('uuid'));
    }

    hideDeleteOrdinationModal() {
        this.setState({
            deletingOrdination: false
        });
    }

    printPartialBill() {
        diningTablesEditorActions.printPartialBill(this.props.data.get('editingTable').get('uuid'));
    }

    beginDiningTableClosing() {
        diningTablesEditorActions.beginDiningTableClosing();
    }

    static getReviewContent(props) {
        let orders = [];
        let evening = props.get('evening');

        let diningTable = iGet(props, "diningTablesEditing.diningTable");

        if (diningTable.get('ordinations').size === 0) {
            return <Scrollable><h5 className="text-center">Il tavolo è vuoto</h5></Scrollable>
        }
        diningTable.get('ordinations').forEach(ordination => {
            ordination.get('orders').forEach(order => {
                orders.push(order);
            });
        });
        let allOrders = orders;
        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders, props.get('dishes'), props.get('additions'));
        let ordersComponents = orders.map(o => {
            let left = OrdinationsUtils.renderImplodedOrder(o, props.get('dishes'), props.get('additions'));
            return <Row key={o.get('groupId')}>
                <Column>
                    <FormattedParagraph leftText={left} rightText={OrdinationsUtils.formatPrice(o.get('price'))}/>
                </Column>
            </Row>;
        });
        let coverCharges = diningTable.get('coverCharges');
        let leftCoverCharges = coverCharges + " ";
        if (coverCharges > 1) {
            leftCoverCharges += " COPERTI";
        } else {
            leftCoverCharges += " COPERTO";
        }
        let coverChargesPrice = coverCharges * evening.get('coverCharge');
        let rightCoverCharges = OrdinationsUtils.formatPrice(coverChargesPrice);
        let total = OrdinationsUtils.total(allOrders) + coverChargesPrice;
        return <Row grow>
            <Column>
                <Scrollable>
                    <Row>
                        <Column>
                            <FormattedParagraph leftText={leftCoverCharges} rightText={rightCoverCharges}/>
                        </Column>
                    </Row>
                    {ordersComponents}
                </Scrollable>
                <Row>
                    <Column>
                        <b>TOTALE: <span>{OrdinationsUtils.formatPrice(total)}</span></b>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    createOrdination() {
        //FIXME
        // ordinationsCreatorActions.beginOrdinationCreation();
    }

    selectOrdination(uuid) {
        ordinationsEditorActions.selectOrdination(uuid);
    }

    getOrdinationsEditorContent(props) {
        let ordinationEditor;
        let ordinationsNav;
        let diningTable = props.get("editingTable");
        if (props.get('editingOrdination')) {
            if (props.get('editingOrdination').get('uuid') === NEW_ORDINATION_UUID) {
                ordinationEditor = <OrdinationCreator data={props}/>;
            } else {
                ordinationEditor = <OrdinationEditor data={props}/>;
            }
        }

        return <Column>
            <Row topSpaced grow>
                <Column>
                    {ordinationEditor}
                </Column>
            </Row>
        </Column>
    }

    static getReviewActions(data) {
        let table = iGet(data, "diningTablesEditing.diningTable");

        let otherOpenTables = data.get('evening').get('diningTables')
            .filter(t => t.get('status') !== "CHIUSO")
            .filter(t => t.get('uuid') !== table.get('uuid'));

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <h5 className="text-center">Azioni sul tavolo</h5>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <Button
                            text="Nuova comanda"
                            icon="plus"
                            type="info"
                            size="lg"
                            commitAction={() => OrdinationsCreatorActions.beginOrdinationCreation()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        <Button
                            text="Modifica dati del tavolo"
                            icon="pencil"
                            size="lg"
                            commitAction={() => diningTablesEditorActions.beginDiningTableDataEditing()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        <Button
                            text="Stampa pre-conto"
                            icon="print"
                            size="lg"
                            commitAction={() => this.printPartialBill()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        <Button
                            text="Conti"
                            icon="euro"
                            size="lg"
                            commitAction={() => diningTablesEditorActions.beginDiningTableBillsEditing()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        <Button
                            text="Fondi tavolo"
                            icon="handshake-o"
                            size="lg"
                            commitAction={() => this.showMergeDiningTableModal()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        <Button
                            text="Elimina tavolo"
                            icon="remove"
                            size="lg"
                            type="danger"
                            commitAction={() => this.showDeleteDiningTableModal()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row>
                    <ConfirmModal
                        visible={data.get('deletingDiningTable')}
                        message="Elminare il tavolo?"
                        abortType="secondary"
                        confirmType="danger"
                        abortAction={() => this.hideDeleteDiningTableModal()}
                        confirmAction={() => this.doDeleteDiningTable()}/>
                </Row>
                <Row>
                    <GraphWizard
                        isValid={wData => !!wData["select_page"]}
                        hideReview={true}
                        initialPage="select_page"
                        size="lg"
                        auto={true}
                        renderer={wData => wData["select_page"] ? wData["select_page"].get('uuid') : "?"}
                        visible={data.get('mergingDiningTable')}
                        message="Scegliere il tavolo destinazione"
                        commitAction={(data) => this.doMergeDiningTable(data['select_page'])}
                        abortAction={() => this.hideMergeDiningTableModal()}>
                        <SelectWizardPage
                            rows={5}
                            cols={3}
                            identifier="select_page"
                            id={table => table.get('uuid')}
                            options={otherOpenTables}
                            renderer={table => this.renderDiningTable(table)}
                        />
                    </GraphWizard>
                </Row>
            </Column>
        </Row>
    }

    render() {
        let data = this.props.data;

        let table = iGet(this.props.data, "diningTablesEditing.diningTable");

        let content = DiningTableReview.getReviewContent(data);
        let actions = DiningTableReview.getReviewActions(data);

        return <Row topSpaced grow>
            <Column>
                {content}
            </Column>
            <Column>
                <Row grow>
                    <Column>
                        <Row>
                            <Column>
                                <h5 className="text-center">Comande</h5>
                            </Column>
                        </Row>

                        <Row grow>
                            <Column>
                                <PaginatedList
                                    id={ordination => ordination.get("uuid")}
                                    selectMethod={ordinationsEditorActions.beginOrdinationEditing}
                                    deselectMethod={ordinationsEditorActions.abortOrdinationEditing}
                                    rows={5}
                                    cols={1}
                                    entities={table.get('ordinations').sort(OrdinationsUtils.ordinationDateSorter)}
                                    renderer={ordination => OrdinationsUtils.renderOrdination(ordination)}
                                />
                            </Column>
                        </Row>
                    </Column>
                    <Column>
                        {actions}
                    </Column>
                </Row>
            </Column>
        </Row>;
    }


    renderDiningTable(dt) {
        return DiningTablesUtils.renderDiningTable(dt, this.props.data.get('tables'), this.props.data.get('waiters'));
    }

}