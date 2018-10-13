import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import ColorEditor from "../../components/widgets/inputs/ColorEditor";
import {CategoriesPageActions} from "./CategoriesPageActions";

export default class CategoryEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        let category = data.editor.category;

        let actions = CategoryEditor.buildActions(data);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">{category.name}</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            entity={category}
                            valid={category.name && category.location}
                            deleteMessage="Eliminazione categoria"
                            deleteMethod={(cat) => CategoriesPageActions.deleteCategory(cat)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(data) {
        const actions = [[], []];
        actions[0].push(CategoryEditor.buildNameEditor(data));
        actions[0].push(CategoryEditor.buildLocationEditor(data));
        actions[0].push(CategoryEditor.buildColorEditor(data));
        actions[1].push(CategoryEditor.buildAdditionsEditor(data));

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

    static buildNameEditor(data) {
        return <TextEditor options={{
            label: "Nome",
            value: data.editor.category.name,
            callback: result => CategoriesPageActions.updateCategoryName(data.editor.category.uuid, result)
        }}/>;
    }

    static buildLocationEditor(data) {
        const location = data.editor.category.location;
        return <SelectEditor options={{
            label: "Postazione",
            value: location,
            values: data.data.locations,
            isValid: location => !!location,
            renderer: location => location.name,
            callback: location => CategoriesPageActions.updateCategoryLocation(data.editor.category.uuid, location)
        }}/>;
    }

    static buildColorEditor(data) {
        return <ColorEditor options={{
            label: "Colore",
            value: data.editor.category.color,
            callback: color => CategoriesPageActions.updateCategoryColor(data.editor.category.uuid, color)
        }}/>;
    }

    static buildAdditionsEditor(data) {
        const category = data.editor.category;
        const availableAdditions = data.data.additions
            .filter(addition => !addition.generic || category.additions.includes(addition));

        return <SelectEditor
            textRows="5"
            options={{
                label: "Varianti",
                rows: 6,
                cols: 4,
                multiSelect: true,
                value: data.editor.category.additions,
                values: availableAdditions,
                renderer: addition => addition.name,
                callback: additions => CategoriesPageActions.updateCategoryAdditions(category.uuid, additions)
            }}
        />;
    }

}