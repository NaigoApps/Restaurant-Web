import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import DiningTableClosingWizard from "../diningTablesEditing/diningTableClosing/DiningTableClosingWizard";
import Button from "../../../widgets/Button";
import {iGet} from "../../../utils/Utils";
import DiningTablesUtils from "./DiningTablesUtils";
import BillReview from "./BillReview";
import RoundButton from "../../../widgets/RoundButton";
import {DiningTablesClosingActions} from "../diningTablesEditing/diningTableClosing/DiningTablesClosingActions";
import SelectInput from "../../../components/widgets/inputs/SelectInput";
import {OrdinationsEditorActions} from "../diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import DiningTableReview from "./DiningTableReview";
import {OrdersActions} from "../diningTablesEditing/ordinationsEditing/ordersEditing/OrdersActions";
import ConfirmModal from "../../../widgets/ConfirmModal";
import {DiningTablesEditorActions} from "../diningTablesEditing/DiningTablesEditorActions";
import {EditorStatus} from "../../StoresUtils";

export default class DiningTableBillsReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let content = this.buildContent();

        return <Row grow>
            <Column>
                {content}
            </Column>
        </Row>;
    }

    buildContent() {
        let data = this.props.data;
        let editorStatus = iGet(data, "diningTableClosing.editorStatus");

        if (editorStatus === EditorStatus.EDITING) {
            return <BillReview data={this.props.data}/>
        }
        return <DiningTableReview data={this.props.data}/>;
    }


}