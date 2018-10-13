import React from "react";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import EveningEditorActions from "./EveningEditorActions";

export default class DiningTablesList extends React.Component {

    render() {
        const tables = this.props.tables;
        const page = this.props.page;
        return <SelectInput
            rows={5}
            cols={4}
            page={page}
            options={tables}
            renderer={table => DiningTablesUtils.renderDiningTable(table)}
            onSelect={table => EveningEditorActions.selectDiningTable(table)}
            onDeselect={() => EveningEditorActions.selectDiningTable()}
            onSelectPage={page => EveningEditorActions.selectPage(page)}
        />;
    }


}