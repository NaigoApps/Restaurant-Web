import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import {iGet} from "../../utils/Utils";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";

export default class CategoryEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const actionsProvider = this.props.actionsProvider;
        let category = data.get('category');

        let actions = CategoryEditor.buildActions(data, actionsProvider);

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={category}
                    valid={category.get('name') && category.get('location')}
                    confirmMethod={actionsProvider.onConfirm}
                    abortMethod={actionsProvider.onAbort}
                    deleteMessage="Eliminazione categoria"
                    deleteMethod={actionsProvider.onDelete}>
                    {actions}
                </EntityEditor>
            </Column>
        </Row>;
    }

    static buildActions(data, actionsProvider) {
        const actions = [[], []];
        if (actionsProvider.confirmName) {
            actions[0].push(CategoryEditor.buildNameEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmLocation) {
            actions[0].push(CategoryEditor.buildLocationEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmAdditions) {
            actions[1].push(CategoryEditor.buildAdditionsEditor(data, actionsProvider));
        }

        return actions.map((actionsRow, rowIndex) => {
            return <Row key={rowIndex} ofList={rowIndex > 0}>
                {actionsRow.map((action, colIndex) => {
                    return <Column key={colIndex}>
                        {action}
                    </Column>
                })}
            </Row>
        });
    }

    static buildNameEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Nome",
            value: iGet(data, 'category.name'),
            callback: result => actionsProvider.confirmName(iGet(data, 'category.uuid'), result)
        }}/>;
    }

    static buildLocationEditor(data, actionsProvider) {
        return <SelectEditor options={{
            label: "Postazione",
            value: iGet(data, 'category.location'),
            values: data.get('locations'),
            id: location => location.get('uuid'),
            isValid: location => !!location,
            renderer: location => location.get('name'),
            callback: location => actionsProvider.confirmLocation(iGet(data, 'category.uuid'), location)
        }}/>;
    }

    static buildAdditionsEditor(data, actionsProvider) {
        const category = data.get('category');
        const availableAdditions = data.get('additions')
            .filter(addition => !addition.get("generic") || category.get('additions').includes(addition.get('uuid')));

        return <SelectEditor
            textRows="5"
            options={{
                label: "Varianti",
                rows: 6,
                cols: 4,
                multiSelect: true,
                value: iGet(data, 'category.additions'),
                values: availableAdditions,
                id: addition => addition.get('uuid'),
                renderer: addition => addition.get('name'),
                callback: additions => actionsProvider.confirmAdditions(iGet(data, 'category.uuid'), additions)
            }}
        />;
    }

}