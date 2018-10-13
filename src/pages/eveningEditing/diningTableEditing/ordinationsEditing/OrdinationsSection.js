import React from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import EditorMode from "../../../../utils/EditorMode";
import OrdinationsEditorActions from "./OrdinationsEditorActions";
import DiningTableEditor from "../DiningTableEditor";
import OrdinationsUtils from "../../OrdinationsUtils";
import {OrdersActions} from "./ordersEditing/OrdersActions";
import {iGet} from "../../../../utils/Utils";
import OrdinationEditor from "./OrdinationEditor";
import DiningTableReview from "../../tables/DiningTableReview";
import SelectInput from "../../../../components/widgets/inputs/SelectInput";
import Button from "../../../../widgets/Button";
import ConfirmModal from "../../../../widgets/ConfirmModal";

export default class OrdinationsSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props;
        return <Row grow>
            <Column>
                ORDINAZIONI
            </Column>
        </Row>
    }

    buildOrdinationsContent() {
        let data = this.props;
        let ordinationEditorMode = data.ordinationEditing.editor.mode;

        switch (ordinationEditorMode) {
            case EditorMode.CREATING:
                //FIXME
                return <OrdinationEditor data={data} actionsProvider={OrdinationsEditorActions}/>;
            case EditorMode.EDITING:
                return <OrdinationEditor data={data} actionsProvider={OrdinationsEditorActions}/>;
            default:
                return <DiningTableReview data={data}/>;
        }
    }
    buildOrdinationSide() {
        let data = this.props;
        const table = this.props.diningTableEditing.editor.entity;
        const ordination = this.props.ordintionEditing.editor.entity;
        let status = iGet(data, "ordinationEditing.status");

        if (ordination && status === EditorMode.EDITING) {
            const isDeleting = iGet(data, "ordinationEditing.deletingOrdination");
            return DiningTableEditor.buildOrdinationButtons(table, ordination, isDeleting);
        } else {
            const page = iGet(data, "ordinationEditing.page");
            const ordinations = table.get('ordinations');
            return DiningTableEditor.buildOrdinationsList(ordinations.sort(OrdinationsUtils.ordinationDateSorter), page);
        }
    }

    static buildOrdinationsList(ordinations, page) {
        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <Button
                            text="Nuova comanda"
                            icon="plus"
                            size="lg"
                            type="success"
                            commitAction={() => OrdinationsEditorActions.beginOrdinationCreation()}
                            textRows="5"
                        />
                    </Column>
                </Row>
                <Row ofList grow>
                    <Column>
                        <SelectInput
                            id={ordination => ordination.get("uuid")}
                            onSelectPage={page => OrdinationsEditorActions.selectOrdinationPage(page)}
                            onSelect={ordination => OrdinationsEditorActions.beginOrdinationEditing(ordination)}
                            onDeselect={OrdinationsEditorActions.abortOrdinationEditing}
                            selected={null}
                            page={page}
                            rows={6}
                            cols={1}
                            options={ordinations}
                            renderer={ordination => OrdinationsUtils.renderOrdination(ordination)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildOrdinationButtons(table, ordination, isDeleting) {
        return <Row>
            <Column>
                <Row>
                    <Column auto>
                        <Button
                            text="Torna ad elenco comande"
                            icon="level-up"
                            size="lg"
                            commitAction={() => OrdinationsEditorActions.abortOrdinationEditing()}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button
                            text="Modifica comanda"
                            icon="pencil"
                            size="lg"
                            type="warning"
                            commitAction={() => OrdersActions.beginOrdersEditing(ordination.get('orders'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Stampa comanda"
                                icon="print"
                                size="lg"
                                type={ordination && ordination.get('dirty') ? "warning" : "secondary"}
                                commitAction={() => OrdinationsEditorActions.printOrdination(ordination.get('uuid'))}
                                fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button
                            text="Annullamento comanda"
                            icon="times-circle"
                            type="danger"
                            size="lg"
                            commitAction={() => OrdinationsEditorActions.abortOrdination(ordination.get('uuid'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina comanda"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => OrdinationsEditorActions.beginOrdinationDeletion()}
                                fullHeight/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={isDeleting}
                    message="Elminare la comanda e tutti gli ordini associati?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => OrdinationsEditorActions.abortOrdinationDeletion()}
                    confirmAction={() => OrdinationsEditorActions.deleteOrdination(table.uuid, ordination.uuid)}/>
            </Column>
        </Row>
    }

}