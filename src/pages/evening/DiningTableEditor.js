import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import Button from "../../widgets/Button";
import {findByUuid} from "../../utils/Utils";
import {beautifyTime} from "../../components/widgets/inputs/DateInput";
import OrdinationEditor from "../../components/OrdinationEditor";
import ordinationsCreatorActions from "./OrdinationsCreatorActions";
import OrdinationCreator from "../../components/widgets/inputs/OrdinationCreator";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import ButtonGroup from "../../widgets/ButtonGroup";
import DiningTableReview from "./DiningTableReview";
import NavPills from "../../widgets/NavPills";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import NavTabs from "../../widgets/NavTabs";
import NavElement from "../../widgets/NavElement";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";

const TABLE_DATA = 0;
const ORDINATIONS = 1;
const REVIEW = 2;

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: ORDINATIONS
        };
    }

    coverChargesChange(value) {
        diningTablesEditorActions.updateDiningTableCoverCharges(this.props.diningTable.uuid, value);
    }

    waiterChange(waiter) {
        diningTablesEditorActions.updateDiningTableWaiter(this.props.diningTable.uuid, waiter);
    }

    tableChange(table) {
        diningTablesEditorActions.updateDiningTableTable(this.props.diningTable.uuid, table);
    }

    deleteDiningTable() {
        // eveningActions.deleteDiningTable(this.state.diningTable);
    }

    createOrdination() {
        ordinationsCreatorActions.beginOrdinationCreation();
    }

    selectOrdination(uuid) {
        ordinationsEditorActions.selectOrdination(uuid);
    }

    setCurrentTab(val) {
        this.setState({
            currentTab: val
        });
    }

    getTableDataEditorContent() {
        return <form className="top-sep">
            <IntegerEditor
                descriptor={DiningTableEditor.getCoverChargesDescriptor()}
                value={this.props.diningTable.coverCharges}
                commitAction={this.coverChargesChange.bind(this)}
            />
            <EntitySelectEditor
                descriptor={DiningTableEditor.getWaitersDescriptor(this.props.waiters)}
                value={this.props.diningTable.waiter}
                commitAction={this.waiterChange.bind(this)}
            />
            <EntitySelectEditor
                descriptor={DiningTableEditor.getTablesDescriptor(this.props.tables)}
                value={this.props.diningTable.table}
                commitAction={this.tableChange.bind(this)}
            />
        </form>
    }

    getOrdinationsEditorContent() {
        let ordinationEditor;
        let ordinationsNav;
        if (this.props.createdOrdination) {
            ordinationEditor = <OrdinationCreator
                table={this.props.diningTable.uuid}
                categories={this.props.categories}
                dishes={this.props.dishes}
                phases={this.props.phases}
                additions={this.props.additions}
            />;
        } else {
            if (this.props.selectedOrdination) {
                ordinationEditor = <OrdinationEditor
                    categories={this.props.categories}
                    dishes={this.props.dishes}
                    phases={this.props.phases}
                    additions={this.props.additions}
                    editingOrdination={this.props.editingOrdination}
                    ordination={findByUuid(this.props.ordinations, this.props.selectedOrdination)}/>;
            }
            let ordinationsNavContent = this.props.ordinations.map(o => {
                return <button
                    type="button"
                    className={o.uuid === this.props.selectedOrdination ? "btn btn-primary" : "btn btn-default"}
                    key={o.uuid}
                    onClick={this.selectOrdination.bind(this, o.uuid)}>{beautifyTime(o.creationTime)}</button>;
            });
            ordinationsNav = <ButtonGroup vertical={true} size="lg">{ordinationsNavContent}</ButtonGroup>;
        }
        let creatorButton;
        if (!this.props.createdOrdination) {
            creatorButton = <Button text="Nuova comanda" type="info" commitAction={this.createOrdination.bind(this)}/>;
        }
        return <Column className="form top-sep">
            <Row>
                <Column>
                    <Row>
                        <Column sm="1">
                            {ordinationsNav}
                        </Column>
                        <Column sm="11">
                            {ordinationEditor}
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row>
                <Column centered={true}>
                    {creatorButton}
                </Column>
            </Row>
        </Column>
    }

    getOrdersEditor(ordination) {
        let ordersEditor = ordination.orders.map(o => {
            return <div className="row">{findByUuid(this.props.dishes, o.dish).name}</div>;
        });
        return <div>
            {ordersEditor}
        </div>;
    }

    getFinalReviewEditorContent() {
        return <DiningTableReview
            dishes={this.props.dishes}
            additions={this.props.additions}
            table={this.props.diningTable}
            ordinations={this.props.ordinations}/>
    }

    render() {

        const tab = this.state.currentTab;

        let editorContent;
        if (tab === TABLE_DATA) {
            editorContent = this.getTableDataEditorContent();
        } else if (tab === ORDINATIONS) {
            editorContent = this.getOrdinationsEditorContent();
        } else {
            editorContent = this.getFinalReviewEditorContent();
        }

        return <Row>
            <Column>
                <Row>
                    <Column>
                        <NavPills>
                            <NavElement
                                text="Selezione serata"
                                active={false}
                                commitAction={eveningSelectionFormActions.deselectEvening}
                            />
                            <NavElement
                                text="Elenco tavoli"
                                active={false}
                                commitAction={diningTablesEditorActions.deselectDiningTable}
                            />
                            <NavElement
                                text={this.getEditorTitle.bind(this)()}
                                active={true}
                            />
                        </NavPills>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <NavTabs>
                            <NavElement text="Comande"
                                        active={tab === ORDINATIONS}
                                        commitAction={this.setCurrentTab.bind(this, ORDINATIONS)}/>
                            <NavElement text="Dati del tavolo"
                                        active={tab === TABLE_DATA}
                                        commitAction={this.setCurrentTab.bind(this, TABLE_DATA)}/>
                            <NavElement text="Riepilogo"
                                        active={tab === REVIEW}
                                        commitAction={this.setCurrentTab.bind(this, REVIEW)}/>
                        </NavTabs>
                        {editorContent}
                    </Column>
                </Row>
            </Column>
        </Row>


    }

    getEditorTitle() {
        let table = findByUuid(this.props.tables, this.props.diningTable.table);
        let waiter = findByUuid(this.props.waiters, this.props.diningTable.waiter);
        if (table && waiter) {
            return table.name + " (" + beautifyTime(this.props.diningTable.date) + ") - " + waiter.name;
        }
        return null;
    }

    static getCoverChargesDescriptor() {
        return {
            name: "coverCharges",
            label: "Coperti"
        };
    }

    static getWaitersDescriptor(waiters) {
        return {
            name: "waiter",
            label: "Cameriere",
            options: waiters,
            renderer: w => w.name
        };
    }

    static getTablesDescriptor(tables) {
        return {
            name: "table",
            label: "Tavolo",
            options: tables,
            renderer: t => t.name
        };
    }

}