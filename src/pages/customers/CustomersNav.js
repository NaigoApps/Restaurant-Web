import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import CustomersPageActions from "./CustomersPageActions";

export default class CustomersNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = CustomersNav.makeNavContent(this.props);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editorMode = data.editor.mode;
        const customer = data.editor.customer;

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="customers"
            text="Clienti"
            active={!data.editor.customer}
            commitAction={() => CustomersPageActions.selectCustomer(null)}
        />);
        if (editorMode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={customer.name}
                active={true}
            />);
        } else if (editorMode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Creazione cliente"}
                active={true}
            />);
        }
        return elements;
    }
}