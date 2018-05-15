import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {TablesEditorActions} from "./TablesEditorActions";
import {TablesCreatorActions} from "./TablesCreatorActions";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class TablesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <SelectInput
                    bordered
                    id={table => table.get('uuid')}
                    rows={StoresUtils.settings(data, "tablesRows", 3)}
                    cols={StoresUtils.settings(data, "tablesColumns", 3)}
                    options={data.get('tables')}
                    page={data.get('page')}
                    renderer={table => table.get('name')}
                    onSelectPage={index => TablesEditorActions.selectTablePage(index)}
                    onSelect={table => TablesEditorActions.selectTable(table)}
                />
            </Column>
        </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuovo tavolo"
                                 type="success"
                                 commitAction={() => TablesCreatorActions.beginTableCreation()}
                    />
                </Column>
            </Row>];
    }

}