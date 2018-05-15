import React, {Component} from 'react';
import {TYPES} from "../../components/editors/EntityEditor";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import printersPageActions from "./PrintersPageActions";
import {PrintersEditorActions} from "./PrintersEditorActions";
import {PrintersCreatorActions} from "./PrintersCreatorActions";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class PrintersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <SelectInput
                    bordered
                    rows={StoresUtils.settings(data, "printersRows", 3)}
                    cols={StoresUtils.settings(data, "printersColumns", 3)}
                    id={printer => printer.get('uuid')}
                    options={data.get('printers')}
                    page={data.get('page')}
                    renderer={printer => printer.get('name')}
                    onSelectPage={index => printersPageActions.onSelectPrinterPage(index)}
                    onSelect={printer => PrintersEditorActions.selectPrinter(printer)}
                />
            </Column>
        </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton icon="plus"
                                 text="Nuova stampante"
                                 type="success"
                                 commitAction={() => PrintersCreatorActions.beginPrinterCreation()}
                    />
                </Column>
            </Row>];
    }
}