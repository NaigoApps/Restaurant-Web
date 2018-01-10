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
        let name = props.category.name || "Nuova categoria";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.category}
                    confirmMethod={categoriesCreatorActions.createCategory}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={props.category.name}
                        commitAction={categoriesCreatorActions.updateCategoryName}
                    />
                    <EntitySelectEditor
                        label="Postazione"
                        options={props.locations}
                        renderer={loc => loc.name}
                        value={props.category.location}
                        commitAction={categoriesCreatorActions.updateCategoryLocation}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}