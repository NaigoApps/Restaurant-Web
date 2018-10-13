import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import ColorEditor from "../../components/widgets/inputs/ColorEditor";
import {CategoriesPageActions} from "./CategoriesPageActions";

export default class CategoryCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        let category = data.editor.category;

        let actions = CategoryCreator.buildActions(data);

        return <Row topSpaced grow>
            <Column>

                <Row>
                    <Column>
                        <h3 className="text-center">Creazione categoria</h3>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <EntityEditor
                            entity={category}
                            valid={category.name && category.location}
                            abortMethod={() => CategoriesPageActions.selectCategory(null)}
                            confirmMethod={(cat) => CategoriesPageActions.createCategory(cat)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(data) {
        const actions = [[]];
        actions[0].push(CategoryCreator.buildNameEditor(data));
        actions[0].push(CategoryCreator.buildLocationEditor(data));
        actions[0].push(CategoryCreator.buildColorEditor(data));

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
            callback: result => CategoriesPageActions.setEditorName(result)
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
            callback: location => CategoriesPageActions.setEditorLocation(location)
        }}/>;
    }

    static buildColorEditor(data) {
        return <ColorEditor options={{
            label: "Colore",
            value: data.editor.category.color,
            callback: color => CategoriesPageActions.setEditorColor(color)
        }}/>;
    }

}