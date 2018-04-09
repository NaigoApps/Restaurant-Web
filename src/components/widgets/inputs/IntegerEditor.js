import React, {Component} from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import OkCancelModal from "../../../widgets/OkCancelModal";
import IntegerInput from "./IntegerInput";
import StoresUtils from "../../../pages/StoresUtils";

/**
 * Events:
 * - onShowModal
 * - onConfirm
 * - onAbort
 *
 * - onChar
 * - onSetCaret
 */

export default class IntegerEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        if(this.props.onConfirm && StoresUtils.isInteger(this.props.text)) {
            this.props.onConfirm(parseInt(this.props.text));
        }
    }

    onWizardAbort(){
        if(this.props.onAbort) {
            this.props.onAbort();
        }
    }

    onShowModal(){
        if(this.props.onShowModal){
            this.props.onShowModal();
        }
    }

    onInputChar(char){
        if(this.props.onChar){
            this.props.onChar(char);
        }
    }

    onInputChange(text){
        if(this.props.onChange){
            this.props.onChange(text);
        }
    }

    isValid(){
        if(this.props.isValid !== undefined){
            return this.props.isValid;
        }
        return true;
    }

    render() {
        return <Row align="center" topSpaced>
            <Column sm="2" right>
                {this.props.label}
            </Column>
            <Column>
                <Button
                    text={this.props.text}
                    commitAction={() => this.onShowModal()}
                />
            </Column>
            <OkCancelModal
                message={this.props.label}
                isValid={() => this.isValid()}
                visible={this.props.visible}
                confirmAction={() => this.onWizardConfirm()}
                abortAction={() => this.onWizardAbort()}>
                <IntegerInput
                    uuid={this.props.uuid}
                    text={this.props.text}
                    onChar={char => this.onInputChar(char)}
                    onChange={text => this.onInputChange(text)}
                />
            </OkCancelModal>
        </Row>
    }
}