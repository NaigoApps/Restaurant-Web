import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import categoriesEditorActions from "./CategoriesEditorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import DishesNavigator from "./DishesNavigator";

export default class CategoryEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let uuid = props.category.uuid;


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.category}
                    abortMethod={categoriesEditorActions.deleteCategory}
                    render={cat => cat.name}>
                    <TextEditor
                        label="Nome"
                        value={props.category.name}
                        commitAction={result => categoriesEditorActions.updateCategoryName(uuid, result)}
                    />
                    <EntitySelectEditor
                        label="Postazione"
                        options={props.locations}
                        renderer={loc => loc.name}
                        value={props.category.location}
                        commitAction={result => categoriesEditorActions.updateCategoryLocation(uuid, result)}
                    />
                    <DishesNavigator data={props}/>
                </EntityEditor>
            </Column>
        </Row>;
    }

}