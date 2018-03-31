import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import categoriesEditorActions from "./CategoriesEditorActions";
import categoriesCreatorActions from "./CategoriesCreatorActions";
import PaginatedList from "../../components/widgets/PaginatedList";

export default class CategoriesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedList
                    id={cat => cat.get('uuid')}
                    rows={9}
                    cols={3}
                    entities={props.get('categories')}
                    renderer={cat => cat.get('name')}
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