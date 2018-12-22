import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";
import {CategoriesPageActions} from "./CategoriesPageActions";

export default class CategoriesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        rows={StoresUtils.option(data, "categoriesRows", 3)}
                        cols={StoresUtils.option(data, "categoriesColumns", 3)}
                        options={data.data.categories}
                        page={data.page}
                        color={cat => cat.color}
                        renderer={category => category.name}
                        onSelectPage={index => CategoriesPageActions.selectNavigatorPage(index)}
                        onSelect={category => CategoriesPageActions.selectCategory(category)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuova categoria"
                                 type="success"
                                 commitAction={() => CategoriesPageActions.beginCreation()}
                    />
                </Column>
            </Row>];
    }

}