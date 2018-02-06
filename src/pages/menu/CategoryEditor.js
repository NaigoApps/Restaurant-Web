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
        let uuid = props.get('category').get('uuid');


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.get('category')}
                    valid={props.get('category').get('name') && props.get('category').get('location')}
                    deleteMethod={categoriesEditorActions.deleteCategory}
                    render={cat => cat.get('name')}>
                    <Row>
                        <Column>
                            <TextEditor
                                label="Nome"
                                value={props.get('category').get('name')}
                                commitAction={result => categoriesEditorActions.updateCategoryName(uuid, result)}
                            />
                        </Column>
                        <Column>
                            <EntitySelectEditor
                                label="Postazione"
                                options={props.get('locations')}
                                renderer={loc => loc.get('name')}
                                value={props.get('category').get('location')}
                                commitAction={result => categoriesEditorActions.updateCategoryLocation(uuid, result)}
                            />
                        </Column>
                    </Row>
                    <DishesNavigator data={props}/>
                </EntityEditor>
            </Column>
        </Row>;
    }

}