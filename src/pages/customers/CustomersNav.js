import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import {EditorStatus} from "../StoresUtils";
import {CustomersEditorActions} from "./CustomersEditorActions";

export default class CustomersNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = CustomersNav.makeNavContent(this.props.data);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editorStatus = data.get('editorStatus');
        const customer = data.get('customer');

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="customers"
            text="Clienti"
            active={editorStatus === EditorStatus.SURFING}
            commitAction={() => CustomersEditorActions.deselectCustomer()}
        />);
        if (editorStatus === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={customer.get('name')}
                active={true}
            />);
        } else if (editorStatus === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Creazione cliente"}
                active={true}
            />);
        }
        return elements;
    }
}