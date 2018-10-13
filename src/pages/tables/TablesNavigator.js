import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";
import {TablesPageActions} from "./TablesPageActions";

export default class TablesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        return [<Row key="list" topSpaced>
            <Column>
                <SelectInput
                    bordered
                    rows={StoresUtils.option(data, "tablesRows", 3)}
                    cols={StoresUtils.option(data, "tablesColumns", 3)}
                    options={data.data.tables}
                    page={data.navigator.page}
                    renderer={table => table.name}
                    onSelectPage={index => TablesPageActions.selectNavigatorPage(index)}
                    onSelect={table => TablesPageActions.selectTable(table)}
                />
            </Column>
        </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuovo tavolo"
                                 type="success"
                                 commitAction={() => TablesPageActions.beginTableCreation()}
                    />
                </Column>
            </Row>];
    }

}