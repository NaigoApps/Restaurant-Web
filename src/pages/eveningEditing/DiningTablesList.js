import React from "react";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import DiningTablesEditorActions from "./diningTableEditing/DiningTablesEditorActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";

export default class DiningTablesList extends React.Component {

    render() {
        const tables = this.props.tables;
        const page = this.props.page;
        return [
            <Row key="title">
                <Column>
                    <h3 className="text-center">Elenco tavoli</h3>
                </Column>
            </Row>,
            <Row key="list">
                <Column>
                    <SelectInput
                        rows={5}
                        cols={4}
                        page={page}
                        options={tables}
                        renderer={table => DiningTablesUtils.renderDiningTable(table)}
                        onSelect={table => DiningTablesEditorActions.select(table)}
                        onDeselect={() => DiningTablesEditorActions.deselect()}
                        onSelectPage={page => DiningTablesEditorActions.selectPage(page)}
                    />
                </Column>
            </Row>];
    }


}