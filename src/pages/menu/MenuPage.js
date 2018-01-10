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
        let navContent = MenuPage.makeNavContent(this.state);
        let pageContent = MenuPage.makePageContent(this.state);
        return (
            <Page title="Menu">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.selectedDish) {
            return <DishEditor data={MenuPage.makeDishEditorDescriptor(state)}/>;
        } else if (state.createdDish) {
            return <DishCreator data={MenuPage.makeDishCreatorDescriptor(state)}/>;
        } else if (state.selectedCategory) {
            return <CategoryEditor data={MenuPage.makeCategoryEditorDescriptor(state)}/>
        } else if (state.createdCategory) {
            return <CategoryCreator data={MenuPage.makeCategoryCreatorDescriptor(state)}/>
        } else {
            return <CategoriesNavigator data={state}/>
        }
    }

    static makeCategoryEditorDescriptor(data) {
        return {
            category: findByUuid(data.categories, data.selectedCategory),
            dishes: data.dishes,
            dishesStatuses: data.dishesStatuses,
            locations: data.locations
        }
    }

    static makeCategoryCreatorDescriptor(data) {
        return {
            category: data.createdCategory,
            locations: data.locations
        }
    }

    static makeDishCreatorDescriptor(data) {
        return {
            dish: data.createdDish
        }
    }

    static makeDishEditorDescriptor(data) {
        return {
            dish: findByUuid(data.dishes, data.selectedDish),
            categories: data.categories,
            dishStatuses: data.dishStatuses
        }
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            href="/restaurant/settings"
        />);
        elements.push(<NavElement
            key="categories"
            text="Categorie"
            active={!state.selectedCategory && !state.createdCategory && !state.selectedDish && !state.createdDish}
            commitAction={categoriesEditorActions.deselectCategory}
        />);
        if (state.selectedCategory) {
            elements.push(<NavElement
                key="selected-cat"
                text={MenuPage.categoryName(findByUuid(state.categories, state.selectedCategory))}
                commitAction={dishesEditorActions.deselectDish}
                active={!state.selectedDish && !state.createdDish}
            />);
        }
        if (state.selectedDish) {
            elements.push(<NavElement
                key="selected-dish"
                text={MenuPage.dishName(findByUuid(state.dishes, state.selectedDish))}
                active={true}
            />);
        } else if (state.createdDish) {
            elements.push(<NavElement
                key="created-dish"
                text={state.createdDish.name || "Nuovo piatto"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }

    static categoryName(cat) {
        return cat ? cat.name : "?";
    }

    static dishName(dish) {
        return dish ? dish.name : "?";
    }
}