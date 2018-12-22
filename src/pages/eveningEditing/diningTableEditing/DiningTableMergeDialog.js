import React from "react";
import DiningTableStatus from "../../../model/DiningTableStatus";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import DiningTablesUtils from "../tables/DiningTablesUtils";
import ScrollableSelectInput from "../../../components/widgets/inputs/ScrollableSelectInput";
import PopupContainer from "../../../components/widgets/PopupContainer";
import Button from "../../../widgets/Button";

export default class DiningTableMergeDialog extends React.Component {

    render() {
        const source = this.props.table;
        const tables = this.props.table.evening.tables
            .filter(table => table !== source && table.status !== DiningTableStatus.CLOSED);
        return <PopupContainer
            visible={this.props.visible}
            size="md"
            blurCallback={() => DiningTablesEditorActions.abortMerge()}>
            <Row key="title">
                <Column>
                    <h3 className="text-center">Selezionare il tavolo destinazione</h3>
                </Column>
            </Row>
            <Row key="list" grow>
                <Column>
                    <ScrollableSelectInput
                        options={tables}
                        selected={this.props.mergeTarget}
                        renderer={table => DiningTablesUtils.renderDiningTable(table)}
                        onSelect={table => DiningTablesEditorActions.selectMergeTarget(table)}
                    />
                </Column>
            </Row>
            <Row>
                <Column>
                    <Button type="danger" text="Annulla" commitAction={() => DiningTablesEditorActions.abortMerge()}/>
                </Column>
                <Column>
                    <Button type="warning" text="Conferma"
                            disabled={!this.props.mergeTarget}
                            commitAction={() => DiningTablesEditorActions.confirmMerge(this.props.table, this.props.mergeTarget)}/>
                </Column>
            </Row>
        </PopupContainer>;
    }


}