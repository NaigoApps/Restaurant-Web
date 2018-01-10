import React, {Component} from 'react';
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import categoriesEditorActions from "./CategoriesEditorActions";
import categoriesCreatorActions from "./CategoriesCreatorActions";

export default class CategoriesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedEntitiesList
                    entities={props.categories}
                    renderer={cat => cat.name}
                    selectMethod={categoriesEditorActions.selectCategory}
                    deselectMethod={categoriesEditorActions.deselectCategory}
                />
            </Column>
        </Row>,
            <Row key="new" topSpaced>
                <Column>
                    <Button
                        text="Nuova categoria"
                        type="info"
                        commitAction={categoriesCreatorActions.beginCategoryCreation}
                    />
                </Column>
            </Row>];
    }

}