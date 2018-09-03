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

export default class CategoriesPage extends ViewController {
    constructor(props) {
        super(props, categoriesPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        CategoriesPageActions.initCategoryPage();
    }

    render() {
        let pageContent = CategoriesPage.makePageContent(this.state.data);
        return (
            <Page title="Menu">
                <CategoriesNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editor = data.editor;

        if (editor.mode === EditorMode.CREATING) {
            return <CategoryCreator data={data}/>;
        } else if (editor.mode === EditorMode.EDITING) {
            return <CategoryEditor data={data}/>
        } else {
            return <CategoriesNavigator data={data}/>;
        }
    }
}