import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import categoriesCreatorActions from "./CategoriesCreatorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";

export default class CategoryCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let name = props.get('category').get('name') || "Nuova categoria";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    valid={props.get('category').get('name') && props.get('category').get('location')}
                    entity={props.get('category')}
                    confirmMethod={categoriesCreatorActions.createCategory}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={props.get('category').get('name')}
                        commitAction={categoriesCreatorActions.updateCategoryName}
                    />
                    <EntitySelectEditor
                        label="Postazione"
                        options={props.get('locations')}
                        renderer={loc => loc.get('name')}
                        value={props.get('category').get('location')}
                        commitAction={categoriesCreatorActions.updateCategoryLocation}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}