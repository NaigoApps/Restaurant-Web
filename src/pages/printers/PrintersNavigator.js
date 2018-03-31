import React, {Component} from 'react';
import printersEditorActions from "./PrintersEditorActions";
import {TYPES} from "../../components/editors/EntityEditor";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import printersCreatorActions from "./PrintersCreatorActions";
import Column from "../../widgets/Column";
import PaginatedList from "../../components/widgets/PaginatedList";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import printersPageActions from "./PrintersPageActions";

export default class PrintersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [
            <Row key="list" topSpaced grow>
                <Column>
                    <SelectInput
                        id={printer => printer.get('uuid')}
                        options={props.get('printers')}
                        page={props.get('page')}
                        renderer={printer => printer.get('name')}
                        onSelectPage={index => printersPageActions.onSelectPrinterPage(index)}
                        onSelect={printer => printersEditorActions.selectPrinter(printer)}
                    />
                </Column>
            </Row>,
            <Row key="new" topSpaced>
                <Column>
                    <Button key="new"
                            text="Nuova stampante"
                            type="info"
                            commitAction={printersCreatorActions.beginPrinterCreation}
                    />
                </Column>
            </Row>];
    }

}