import React from "react";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import RoundButton from "../../widgets/RoundButton";
import DiningTablesEditorActions from "./diningTableEditing/DiningTablesEditorActions";
import DiningTablesList from "./DiningTablesList";
import CRUDStatus from "../../utils/CRUDStatus";
import DiningTableCreator from "./diningTableEditing/DiningTableCreator";
import WaiterStatus from "../../model/WaiterStatus";
import BaseEntity from "../../model/BaseEntity";

/**
 * data
 * table
 */
export default class DiningTablesCRUD extends React.Component {

    render() {
        const crudComponent = DiningTablesCRUD.getCrudComponent(this.props);
        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        {crudComponent}
                    </Column>
                </Row>
                <Row>
                    <Column align="center">
                        <RoundButton
                            type="success"
                            text="Nuovo tavolo"
                            icon="plus"
                            commitAction={() => DiningTablesEditorActions.beginDiningTableCreation()}/>
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    static getCrudComponent(props) {
        if (props.status === CRUDStatus.CREATE) {
            const evening = this.props.data.evening;
            const tables = this.props.data.tables;
            const waiters = this.props.data.waiters
                .filter(w => w.status === WaiterStatus.ACTIVE || BaseEntity.equals(w, table.waiter));
            const table = this.props.table;
            return <DiningTableCreator
                table={table}
                evening={evening}
                tables={tables}
                waiters={waiters}/>
        } else {
            const tables = props.tables;
            const page = props.page;
            return <DiningTablesList tables={tables} page={page}/>
        }
    }


}