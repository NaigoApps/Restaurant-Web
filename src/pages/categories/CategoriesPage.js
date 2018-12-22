import React from 'react';
import categoriesPageStore from "./CategoriesPageStore";
import Page from "../Page";
import CategoriesNavigator from "./CategoriesNavigator";
import CategoryEditor from "./CategoryEditor";
import CategoriesNav from "./CategoriesNav";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import CategoryCreator from "./CategoryCreator";
import {CategoriesPageActions} from "./CategoriesPageActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class CategoriesPage extends ViewController {
    constructor(props) {
        super(props, categoriesPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        CategoriesPageActions.initCategoryPage();
    }

    render() {
        let pageContent = CategoriesPage.makePageContent(this.state);
        return (
            <Page title="Menu">
                <CategoriesNav {...this.state.categories}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editor = data.categories.editor;

        if (editor.mode === EditorMode.CREATING) {
            return <CategoryCreator {...data.categories} data={data.data}/>;
        } else if (editor.mode === EditorMode.EDITING) {
            return <CategoryEditor {...data.categories} data={data.data}/>
        } else {
            return <CategoriesNavigator data={data.data} general={data.general} page={data.categories.navigator.page}/>;
        }
    }
}