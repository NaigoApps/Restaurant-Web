import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {iGet} from "../../utils/Utils";

export default class DishEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;
        const actionsProvider = this.props.actionsProvider;

        const dish = props.get('dish');
        const uuid = dish.get('uuid');

        const actions = DishEditor.buildActions(props, actionsProvider);

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={dish}
                    valid={dish.get('name')}
                    confirmMethod={actionsProvider.onConfirm}
                    abortMethod={actionsProvider.onAbort}
                    deleteMessage="Eliminazione piatto"
                    deleteMethod={actionsProvider.onDelete}>
                    {actions}
                </EntityEditor>
            </Column>
        </Row>;
    }

    static buildActions(data, actionsProvider) {
        const actions = [];
        if (actionsProvider.confirmName) {
            actions.push(DishEditor.buildNameEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmDescription) {
            actions.push(DishEditor.buildDescriptionEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmPrice) {
            actions.push(DishEditor.buildPriceEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmStatus) {
            actions.push(DishEditor.buildStatusEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmCategory) {
            actions.push(DishEditor.buildCategoryEditor(data, actionsProvider));
        }

        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        });
    }

    static buildNameEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Nome",
            value: iGet(data, 'dish.name'),
            callback: result => actionsProvider.confirmName(iGet(data, 'dish.uuid'), result)
        }}/>;
    }

    static buildDescriptionEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Descrizione",
            value: iGet(data, 'dish.description'),
            callback: result => actionsProvider.confirmDescription(iGet(data, 'dish.uuid'), result)
        }}/>;
    }

    static buildPriceEditor(data, actionsProvider) {
        return <FloatEditor
            options={{
                label: "Prezzo",
                value: iGet(data, 'dish.price'),
                min: 0,
                callback: result => actionsProvider.confirmPrice(iGet(data, 'dish.uuid'), result)
            }}
        />;
    }

    static buildStatusEditor(data, actionsProvider) {
        return <SelectEditor options={{
            label: "Stato",
            value: iGet(data, 'dish.status'),
            values: data.get('dishStatuses'),
            isValid: status => !!status,
            callback: status => actionsProvider.confirmStatus(iGet(data, 'dish.uuid'), status)
        }}/>;
    }

    static buildCategoryEditor(data, actionsProvider) {
        return <SelectEditor options={{
            label: "Categoria",
            value: iGet(data, 'dish.category'),
            values: data.get('categories'),
            id: category => category.get('uuid'),
            isValid: category => !!category,
            renderer: category => category.get('name'),
            callback: category => actionsProvider.confirmCategory(iGet(data, 'dish.uuid'), category)
        }}/>
    }
}