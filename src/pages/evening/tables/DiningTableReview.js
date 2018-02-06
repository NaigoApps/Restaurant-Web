import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import Button from "../../../widgets/Button";
import {uuid} from "../../../utils/Utils";
import OrdinationsUtils from "../OrdinationsUtils";
import Scrollable from "../../../components/widgets/Scrollable";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import DiningTableClosingView from "./DiningTableClosingView";
import DiningTablesUtils from "./DiningTablesUtils";
import FormattedParagraph from "../../../widgets/FormattedParagraph";
import PaginatedEntitiesList from "../../../components/widgets/PaginatedEntitiesList";
import ordinationsEditorActions from "../OrdinationsEditorActions";
import ordinationsCreatorActions from "../OrdinationsCreatorActions";
import {NEW_ORDINATION_UUID} from "../../../utils/EntitiesUtils";
import OrdinationCreator from "../../../components/widgets/inputs/OrdinationCreator";
import OrdinationEditor from "../../../components/OrdinationEditor";
import ConfirmModal from "../../../widgets/ConfirmModal";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletingOrdination: false,
            deletingDiningTable: false
        }
    }

    showDeleteDiningTableModal(){
        this.setState({
            deletingDiningTable: true
        });
    }

    doDeleteDiningTable(){
        this.setState({
            deletingDiningTable: false
        });
        diningTablesEditorActions.deleteDiningTable(this.props.data.get('editingTable').get('uuid'));
    }

    hideDeleteDiningTableModal(){
        this.setState({
            deletingDiningTable: false
        });
    }

    showDeleteOrdinationModal(){
        this.setState({
            deletingOrdination: true
        });
    }

    doDeleteOrdination(){
        this.setState({
            deletingOrdination: false
        });
        ordinationsEditorActions.deleteOrdination(this.props.data.get('editingOrdination').get('uuid'));
    }

    hideDeleteOrdinationModal(){
        this.setState({
            deletingOrdination: false
        });
    }

    printPartialBill() {
        diningTablesEditorActions.printPartialBill(this.props.data.table.uuid);
    }

    beginDiningTableClosing() {
        diningTablesEditorActions.beginDiningTableClosing();
    }

    static getReviewContent(props) {
        let orders = [];
        let diningTable = props.get('editingTable');
        if (diningTable.get('ordinations').size === 0) {
            return <Scrollable>Il tavolo è vuoto</Scrollable>
        }
        diningTable.get('ordinations').forEach(ordination => {
            ordination.get('orders').forEach(order => {
                orders.push(order);
            });
        });
        orders = DiningTablesUtils.implode(orders);
        orders = OrdinationsUtils.sortByDish(orders, props.get('dishes'), props.get('additions'));
        let ordersComponents = orders.map(o => {
            let left = OrdinationsUtils.renderImplodedOrder(o, props.get('dishes'), props.get('additions'));
            return <Row key={o.get('order').get('dish') + uuid()}>
                <Column>
                    <FormattedParagraph leftText={left} rightText={OrdinationsUtils.formatPrice(o.get('price'))}/>
                </Column>
            </Row>;
        });
        return <Scrollable>
            {ordersComponents}
        </Scrollable>;
    }

    createOrdination() {
        ordinationsCreatorActions.beginOrdinationCreation();
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

    getOrdinationActions() {
        let data = this.props.data;
        let ordination = data.get('editingOrdination');

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <Button
                            text="Modifica comanda"
                            icon="pencil"
                            size="lg"
                            commitAction={() => ordinationsEditorActions.beginOrdersEditing(data.get('editingOrdination').get('orders'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Button text="Stampa comanda"
                                icon="print"
                                size="lg"
                                type={ordination.get('dirty') ? "warning" : "secondary"}
                                commitAction={() => ordinationsEditorActions.printOrdination(ordination.get('uuid'))}
                                fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Button
                            text="Annullamento comanda"
                            icon="times-circle"
                            type="danger"
                            size="lg"
                            commitAction={ordinationsEditorActions.beginOrdersEditing}
                            fullHeight/>
                    </Column>
                </Row>
                <Row topSpaced grow>
                    <Column>
                        <Button text="Elimina comanda"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => this.showDeleteOrdinationModal()}
                                fullHeight/>
                    </Column>
                </Row>
                <Row>
                    <ConfirmModal
                        visible={this.state.deletingOrdination}
                        message="Elminare la comanda e tutti gli ordini associati?"
                        abortType="secondary"
                        confirmType="danger"
                        abortAction={() => this.hideDeleteOrdinationModal()}
                        confirmAction={() => this.doDeleteOrdination()}/>
                </Row>
            </Column>
        </Row>;
    }

    getDiningTableActions() {
        let data = this.props.data;
        let table = data.get('editingTable');

        return <Row grow>
            <Column>
                <Row grow>
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
                            // commitAction={this.printPartialBill.bind(this)}
                            fullHeight/>
                    </Column>
                </Row>
                <Row grow topSpaced>
                    <Column>
                        <Button
                            text="Conto"
                            icon="euro"
                            size="lg"
                            disabled={DiningTablesUtils.findTableOpenedOrders(table).size === 0}
                            // commitAction={this.beginDiningTableClosing.bind(this)}
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
                        visible={this.state.deletingDiningTable}
                        message="Elminare il tavolo?"
                        abortType="secondary"
                        confirmType="danger"
                        abortAction={() => this.hideDeleteDiningTableModal()}
                        confirmAction={() => this.doDeleteDiningTable()}/>
                </Row>
            </Column>
        </Row>
    }

    render() {

        let table = this.props.data.get('editingTable');

        let selectedOrdination = this.props.data.get('editingOrdination');

        let content = selectedOrdination ? this.getOrdinationsEditorContent(this.props.data) : DiningTableReview.getReviewContent(this.props.data);

        let actions = selectedOrdination ? this.getOrdinationActions() : this.getDiningTableActions();

        return <Row topSpaced grow>
            <Column>
                {content}
            </Column>
            <Column>
                <Row grow>
                    <Column>
                        <h3 className="text-center">Comande</h3>
                        <PaginatedEntitiesList
                            selected={selectedOrdination ? selectedOrdination.get('uuid') : null}
                            selectMethod={ordinationsEditorActions.beginOrdinationEditing}
                            deselectMethod={ordinationsEditorActions.abortOrdinationEditing}
                            rows={4}
                            cols={1}
                            entities={table.get('ordinations').sort(OrdinationsUtils.ordinationDateSorter)}
                            renderer={ordination => OrdinationsUtils.renderOrdination(ordination)}
                        />
                        <Button text="Nuova comanda" type="info" size="lg"
                                commitAction={ordinationsCreatorActions.beginOrdinationCreation}/>
                    </Column>
                    <Column>
                        {actions}
                    </Column>
                </Row>
            </Column>
            <DiningTableClosingView
                visible={false}
                // visible={!!this.props.data.get('currentInvoice')}
                data={this.props.data}/>
        </Row>;
    }

}