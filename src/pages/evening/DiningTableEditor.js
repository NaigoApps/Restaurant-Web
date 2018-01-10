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

    getTableDataEditorContent(props) {
        let uuid = props.diningTable.uuid;

        return <form className="top-sep">
            <IntegerEditor
                label="Coperti"
                value={props.diningTable.coverCharges}
                commitAction={result => diningTablesEditorActions.updateDiningTableCoverCharges(uuid, result)}
            />
            <EntitySelectEditor
                label="Cameriere"
                options={props.waiters}
                renderer={w => w.name}
                value={props.diningTable.waiter}
                commitAction={result => diningTablesEditorActions.updateDiningTableWaiter(uuid, result)}
            />
            <EntitySelectEditor
                label="Tavolo"
                options={props.tables}
                renderer={t => t.name}
                value={props.diningTable.table}
                commitAction={result => diningTablesEditorActions.updateDiningTableTable(uuid, result)}
            />
        </form>
    }

    getOrdinationsEditorContent(props) {
        let ordinationEditor;
        let ordinationsNav;
        if (props.createdOrdination) {
            ordinationEditor = <OrdinationCreator data={DiningTableEditor.makeOrdinationCreatorDescriptor(props)}/>;
        } else {
            if (props.selectedOrdination) {
                ordinationEditor = <OrdinationEditor data={DiningTableEditor.makeOrdinationEditorDescriptor(props)}/>;
            }
            let ordinationsNavContent = props.diningTable.ordinations.map(o => {
                return <Button
                    key={o.uuid}
                    active={o.uuid === props.selectedOrdination}
                    commitAction={this.selectOrdination.bind(this, o.uuid)}
                    text={beautifyTime(o.creationTime)}
                />
            });
            ordinationsNav = <ButtonGroup vertical={true} size="lg">{ordinationsNavContent}</ButtonGroup>;
        }
        let creatorButton;
        if (!props.createdOrdination) {
            creatorButton = <Button text="Nuova comanda" type="info" commitAction={this.createOrdination.bind(this)}/>;
        }
        return <Column>
            <Row topSpaced grow>
                <Column sm="2">
                    {ordinationsNav}
                </Column>
                <Column>
                    {ordinationEditor}
                </Column>
            </Row>
            <Row>
                <Column centered>
                    {creatorButton}
                </Column>
            </Row>
        </Column>
    }

    static makeOrdinationCreatorDescriptor(props) {
        return {
            table: props.diningTable.uuid,
            categories: props.categories,
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions
        }
    }

    static makeOrdinationEditorDescriptor(props) {
        return {
            categories: props.categories,
            dishes: props.dishes,
            phases: props.phases,
            additions: props.additions,
            editingOrdination: props.editingOrdination,
            ordination: findByUuid(props.diningTable.ordinations, props.selectedOrdination)
        }
    }

    getOrdersEditor(ordination) {
        let props = this.props.data;
        let ordersEditor = ordination.orders.map(o => {
            return <div className="row">{findByUuid(props.dishes, o.dish).name}</div>;
        });
        return <div>
            {ordersEditor}
        </div>;
    }

    getFinalReviewEditorContent(props) {
        return <DiningTableReview data={DiningTableEditor.makeDiningTableReviewDescriptor(props)}/>
    }

    render() {

        const tab = this.state.currentTab;

        let editorContent;
        if (tab === TABLE_DATA) {
            editorContent = this.getTableDataEditorContent(this.props.data);
        } else if (tab === ORDINATIONS) {
            editorContent = this.getOrdinationsEditorContent(this.props.data);
        } else {
            editorContent = this.getFinalReviewEditorContent(this.props.data);
        }

        let navContent = DiningTableEditor.makeNavContent(this.props.data);

        return <Row fullHeight>
            <Column rows>
                <Row>
                    <Column>
                        {navContent}
                    </Column>
                </Row>
                <Row topSpaced grow>
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

    static makeNavContent(props) {
        return <NavPills>
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
                text={DiningTableEditor.renderTableNavElement(props)}
                active={true}
            />
        </NavPills>
    }

    static makeDiningTableReviewDescriptor(props) {
        return {
            dishes: props.dishes,
            additions: props.additions,
            table: props.diningTable,
            ordinations: props.diningTable.ordinations,
            currentInvoice: props.currentInvoice,
            closingDiningTable: props.closingDiningTable,
        }
    }

    static renderTableNavElement(props) {
        let table = findByUuid(props.tables, props.diningTable.table);
        let waiter = findByUuid(props.waiters, props.diningTable.waiter);
        return DiningTableEditor.renderDiningTable(table, waiter, props.diningTable);
    }

    static renderDiningTable(table, waiter, diningTable) {
        if (table && waiter) {
            return table.name + " (" + beautifyTime(diningTable.openingTime) + ") - " + waiter.name;
        }
        return "?";
    }

}