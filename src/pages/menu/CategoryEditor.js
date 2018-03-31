import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import categoriesEditorActions from "./CategoriesEditorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import DishesNavigator from "./DishesNavigator";
import EntitiesSelectEditor from "../../components/widgets/inputs/EntitiesSelectEditor";

export default class CategoryEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let category = props.get('category');
        if(category) {
            let uuid = category.get('uuid');

            let editorAdditions = props.get('additions')
                .filter(addition => !addition.get("generic") || category.get('additions').includes(addition.get('uuid')))

            return <Row topSpaced>
                <Column>
                    <EntityEditor
                        entity={category}
                        valid={category.get('name') && category.get('location')}
                        deleteMethod={categoriesEditorActions.deleteCategory}
                        render={cat => cat.get('name')}>
                        <Row>
                            <Column>
                                <TextEditor
                                    label="Nome"
                                    value={category.get('name')}
                                    commitAction={result => categoriesEditorActions.updateCategoryName(uuid, result)}
                                />
                            </Column>
                            <Column>
                                <EntitySelectEditor
                                    label="Postazione"
                                    options={props.get('locations')}
                                    renderer={loc => loc.get('name')}
                                    value={category.get('location')}
                                    commitAction={result => categoriesEditorActions.updateCategoryLocation(uuid, result)}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <EntitiesSelectEditor
                                    label="Varianti"
                                    labelSize="2"
                                    buttonSize="10"
                                    rows={5}
                                    cols={3}
                                    options={editorAdditions}
                                    renderer={a => a.get('name')}
                                    value={category.get('additions')}
                                    commitAction={result => categoriesEditorActions.updateCategoryAdditions(uuid, result)}
                                />
                            </Column>
                        </Row>
                        <DishesNavigator data={props}/>
                    </EntityEditor>
                </Column>
            </Row>;
        }
        return <div/>;
    }

}