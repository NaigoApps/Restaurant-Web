import React, {Component} from 'react';
import $ from 'jquery';
import ordinationsEditorActions from "../../../../pages/evening/diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import OrdinationsUtils from "../../../../pages/evening/OrdinationsUtils";
import graphWizardActions from "./GraphWizardActions";
import Keyboard, {BACKSPACE, LEFT, RIGHT} from "../../inputs/Keyboard";
import GraphWizardPage from "./GraphWizardPage";
import {findByUuid, findIndexByUuid, uuid} from "../../../../utils/Utils";

export default class OrderFreeAdditionsWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "text_input_" + uuid()
        }
    }

    getSampleOrder() {
        let orders = this.props.data.get('editingOrders');
        if(orders) {
            return findByUuid(orders, this.props.wizardData["editing"]);
        }
        return null;
    }

    getTextLength() {
        let sampleOrder = this.getSampleOrder();
        if(sampleOrder) {
            return sampleOrder.get('notes') ? sampleOrder.get('notes').length : 0;
        }
        return 0;
    }

    updateSelectedOrderFreeAddition(text) {
        let orders = this.props.data.get('editingOrders');
        let index = findIndexByUuid(orders, this.props.wizardData["editing"]);

        ordinationsEditorActions.updateOrderFreeAddition(index, text);
    }

    componentDidMount() {
        let input = $("#" + this.state.uuid);
        input[0].setSelectionRange(this.getTextLength(), this.getTextLength());
    }

    onChar(char) {
        let text = this.getSampleOrder() ? this.getSampleOrder().get('notes') || "" : "";
        let input = $("#" + this.state.uuid)[0];
        let pos = input.selectionStart;
        switch (char) {
            case BACKSPACE:
                if (pos > 0) {
                    this.updateSelectedOrderFreeAddition(text.slice(0, pos - 1) + text.slice(pos));
                    input.focus();
                }
                break;
            case LEFT:
                this.onLeft();
                break;
            case RIGHT:
                this.onRight();
                break;
            default:
                this.updateSelectedOrderFreeAddition(text.substr(0, pos) + char + text.substr(pos, text.length));
                input.focus();
                break;
        }
    }

    onChange(evt) {
        this.updateSelectedOrderFreeAddition(evt.target.value);
    }

    onLeft() {
        let input = $("#" + this.state.uuid);
        let pos = input[0].selectionStart;
        pos = Math.max(pos - 1, 0);
        input.focus();
        input[0].setSelectionRange(pos, pos);
    }

    onRight() {
        let input = $("#" + this.state.uuid);
        let pos = input[0].selectionStart;
        pos = Math.min(pos + 1, this.getTextLength());
        input.focus();
        input[0].setSelectionRange(pos, pos);
    }

    render() {
        const placeholder = this.props.placeholder;
        let text = this.getSampleOrder() ? this.getSampleOrder().get('notes') || "" : "";

        return (
            <GraphWizardPage>
                <div className="row">
                    <div className="col-sm-12">
                        <input
                            id={this.state.uuid}
                            className="form-control"
                            placeholder={placeholder}
                            type="text"
                            value={text || ""}
                            onChange={this.onChange.bind(this)}/>
                    </div>
                </div>
                <div className="row top-sep">
                    <div className="col-sm-12">
                        <Keyboard onCharAction={this.onChar.bind(this)}/>
                    </div>
                </div>
            </GraphWizardPage>
        )
    }

}