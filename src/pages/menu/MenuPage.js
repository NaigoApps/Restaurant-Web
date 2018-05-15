import React, {Component} from 'react';
import menuPageActions from "./MenuPageActions";
import menuPageStore from "./MenuPageStore";
import Page from "../Page";
import CategoriesNavigator from "./CategoriesNavigator";
import CategoryEditor from "./CategoryEditor";
import MenuNav from "./MenuNav";
import {EditorStatus} from "../StoresUtils";
import {CategoriesCreatorActions} from "./CategoriesCreatorActions";
import {CategoriesEditorActions} from "./CategoriesEditorActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import DishEditor from "./DishEditor";
import {DishesCreatorActions} from "./DishesCreatorActions";
import {DishesEditorActions} from "./DishesEditorActions";
import DishesNavigator from "./DishesNavigator";
import {iGet} from "../../utils/Utils";

const {Map} = require('immutable');

export default class MenuPage extends Component {
    constructor(props) {
        super(props);
        this.state = menuPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        menuPageStore.addChangeListener(this.updateState);

        menuPageActions.initMenuPage();
    }

    componentWillUnmount() {
        menuPageStore.removeChangeListener(this.updateState);
    }

    updateState(state) {
        this.setState(state);
    }

    render() {
        let pageContent = MenuPage.makePageContent(this.state.data);
        return (
            <Page title="Menu">
                <MenuNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const catEditorStatus = data.get('categoriesEditorStatus');
        const dishEditorStatus = data.get('dishesEditorStatus');

        if (catEditorStatus === EditorStatus.CREATING) {
            return <CategoryEditor data={data} actionsProvider={CategoriesCreatorActions}/>;
        } else if (catEditorStatus === EditorStatus.EDITING) {
            return <Row grow>
                <Column>
                    <Row grow>
                        <Column>
                            <CategoryEditor data={data} actionsProvider={CategoriesEditorActions}/>
                        </Column>
                    </Row>
                    <Row grow>
                        <Column>
                            {MenuPage.makeDishContent(data)}
                        </Column>
                    </Row>
                </Column>
            </Row>
        } else {
            return <CategoriesNavigator data={data}/>;
        }
    }

    static makeDishContent(data){
        const dishEditorStatus = data.get('dishesEditorStatus');
        if (dishEditorStatus === EditorStatus.CREATING) {
            return <DishEditor data={data} actionsProvider={DishesCreatorActions}/>;
        } else if (dishEditorStatus === EditorStatus.EDITING) {
            return <DishEditor data={data} actionsProvider={DishesEditorActions}/>;
        } else {
            return <DishesNavigator data={data}/>;
        }
    }
}