import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import {CategoriesEditorActions} from "./CategoriesEditorActions";
import {CategoriesCreatorActions} from "./CategoriesCreatorActions";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class CategoriesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        id={category => category.get('uuid')}
                        rows={StoresUtils.settings(data, "categoriesRows", 3)}
                        cols={StoresUtils.settings(data, "categoriesColumns", 3)}
                        options={data.get('categories')}
                        page={data.get('categoriesPage')}
                        renderer={category => category.get('name')}
                        onSelectPage={index => CategoriesEditorActions.selectCategoryPage(index)}
                        onSelect={category => CategoriesEditorActions.selectCategory(category)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuova categoria"
                                 type="success"
                                 commitAction={() => CategoriesCreatorActions.beginCreation()}
                    />
                </Column>
            </Row>];
    }

}