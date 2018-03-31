import React, {Component} from 'react';
import menuPageActions from "./MenuPageActions";
import menuPageStore from "./MenuPageStore";
import categoriesEditorActions from "./CategoriesEditorActions";
import dishesEditorActions from "./DishesEditorActions";
import Page from "../Page";
import CategoriesNavigator from "./CategoriesNavigator";
import NavElementLink from "../../widgets/NavElementLink";
import NavPills from "../../widgets/NavPills";
import NavElement from "../../widgets/NavElement";
import {findByUuid} from "../../utils/Utils";
import CategoryEditor from "./CategoryEditor";
import CategoryCreator from "./CategoryCreator";
import DishCreator from "./DishCreator";
import DishEditor from "./DishEditor";
import {SETTINGS} from "../../App";

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
        let navContent = MenuPage.makeNavContent(this.state.data);
        let pageContent = MenuPage.makePageContent(this.state.data);
        return (
            <Page title="Menu">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.get('selectedDish')) {
            return <DishEditor data={MenuPage.makeDishEditorDescriptor(state)}/>;
        } else if (state.get('createdDish')) {
            return <DishCreator data={MenuPage.makeDishCreatorDescriptor(state)}/>;
        } else if (state.get('selectedCategory')) {
            return <CategoryEditor data={MenuPage.makeCategoryEditorDescriptor(state)}/>
        } else if (state.get('createdCategory')) {
            return <CategoryCreator data={MenuPage.makeCategoryCreatorDescriptor(state)}/>
        } else {
            return <CategoriesNavigator data={state}/>
        }
    }

    static makeCategoryEditorDescriptor(data) {
        return Map({
            category: findByUuid(data.get('categories'), data.get('selectedCategory')),
            dishes: data.get('dishes'),
            dishesStatuses: data.get('dishesStatuses'),
            locations: data.get('locations'),
            additions: data.get('additions')
        })
    }

    static makeCategoryCreatorDescriptor(data) {
        return Map({
            category: data.get('createdCategory'),
            locations: data.get('locations')
        })
    }

    static makeDishCreatorDescriptor(data) {
        return Map({
            dish: data.get('createdDish')
        })
    }

    static makeDishEditorDescriptor(data) {
        return Map({
            dish: findByUuid(data.get('dishes'), data.get('selectedDish')),
            categories: data.get('categories'),
            dishStatuses: data.get('dishStatuses')
        })
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            page={SETTINGS}
        />);
        elements.push(<NavElement
            key="categories"
            text="Categorie"
            active={!state.get('selectedCategory') && !state.get('createdCategory') &&
            !state.get('selectedDish ') && !state.get('createdDish')}
            commitAction={categoriesEditorActions.deselectCategory}
        />);
        if (state.get('selectedCategory')) {
            elements.push(<NavElement
                key="selected-cat"
                text={MenuPage.categoryName(findByUuid(state.get('categories'), state.get('selectedCategory')))}
                commitAction={dishesEditorActions.deselectDish}
                active={!state.get('selectedDish') && !state.get('createdDish')}
            />);
        }
        if (state.get('selectedDish')) {
            elements.push(<NavElement
                key="selected-dish"
                text={MenuPage.dishName(findByUuid(state.get('dishes'), state.get('selectedDish')))}
                active={true}
            />);
        } else if (state.get('createdDish')) {
            elements.push(<NavElement
                key="created-dish"
                text={state.get('createdDish').get('name') || "Nuovo piatto"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }

    static categoryName(cat) {
        return cat ? cat.get('name') : "?";
    }

    static dishName(dish) {
        return dish ? dish.get('name') : "?";
    }
}