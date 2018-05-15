import requestBuilder from "../../actions/RequestBuilder";
import dispatcher from "../../dispatcher/SimpleDispatcher";


export const CategoriesEditorActionTypes={
    DELETE_EDITING_CATEGORY: "DELETE_EDITING_CATEGORY",
    UPDATE_EDITING_CATEGORY: "UPDATE_EDITING_CATEGORY",
    SELECT_EDITING_CATEGORY: "SELECT_EDITING_CATEGORY",
    DESELECT_EDITING_CATEGORY: "DESELECT_EDITING_CATEGORY",
    SELECT_EDITING_CATEGORY_PAGE: "SELECT_EDITING_CATEGORY_PAGE",
};

export const CategoriesEditorActions = {

    selectCategoryPage : (page) =>
        dispatcher.fireEnd(
            CategoriesEditorActionTypes.SELECT_EDITING_CATEGORY_PAGE,
            page
        ),

    selectCategory : (category) =>
        dispatcher.fireEnd(
            CategoriesEditorActionTypes.SELECT_EDITING_CATEGORY,
            category
        ),

    deselectCategory : () =>
        dispatcher.fireEnd(
            CategoriesEditorActionTypes.DESELECT_EDITING_CATEGORY
        ),


    onDelete : (category) =>
        requestBuilder.remove(
            CategoriesEditorActionTypes.DELETE_EDITING_CATEGORY,
            'categories',
            category
        ),

    confirmName : (uuid, value) =>
        requestBuilder.put(
            CategoriesEditorActionTypes.UPDATE_EDITING_CATEGORY,
            'categories/' + uuid + '/name',
            value
        ),

    confirmLocation : (uuid, value) =>
        requestBuilder.put(
            CategoriesEditorActionTypes.UPDATE_EDITING_CATEGORY,
            'categories/' + uuid + '/location',
            value
        ),

    confirmAdditions : (uuid, values) =>
        requestBuilder.put(
            CategoriesEditorActionTypes.UPDATE_EDITING_CATEGORY,
            'categories/' + uuid + '/additions',
            values
        ),

};