import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {PrintersPageActions} from "./PrintersPageActions";
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
                    rows={StoresUtils.option(data, "printersRows", 3)}
                    cols={StoresUtils.option(data, "printersColumns", 3)}
                    options={data.printers}
                    page={data.navigator.page}
                    renderer={printer => printer.name}
                    onSelectPage={index => PrintersPageActions.selectPrinterNavigatorPage(index)}
                    onSelect={printer => PrintersPageActions.selectPrinter(printer)}
                />
            </Column>
        </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton icon="plus"
                                 text="Nuova stampante"
                                 type="success"
                                 commitAction={() => PrintersPageActions.beginPrinterCreation()}
                    />
                </Column>
            </Row>];
    }
}