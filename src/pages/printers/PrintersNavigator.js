import React, {Component} from 'react';
import printersEditorActions from "./PrintersEditorActions";
import {TYPES} from "../../components/editors/EntityEditor";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import printersCreatorActions from "./PrintersCreatorActions";
import Column from "../../widgets/Column";

export default class PrintersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <PaginatedEntitiesList
                        entities={props.printers}
                        renderer={printer => printer.name}
                        selectMethod={printersEditorActions.selectPrinter}
                        deselectMethod={printersEditorActions.deselectPrinter}
                    />
                </Column>
            </Row>,
            <Row topSpaced>
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