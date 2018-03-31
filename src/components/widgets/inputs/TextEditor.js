import React, {Component} from 'react';
import TextInput from "./text/TextInput";
import Button from "../../../widgets/Button";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import OkCancelModal from "../../../widgets/OkCancelModal";

export default class TextEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        if(this.props.onConfirm) {
            this.props.onConfirm(this.props.text);
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

    onSetInputCaret(pos){
        if(this.props.onSetCaret){
            this.props.onSetCaret(pos);
        }
    }

    render() {
        return <Row>
            <Column>
                <Button
                    text={this.props.text}
                    commitAction={() => this.onShowModal()}
                />
            </Column>
            <OkCancelModal
                visible={this.props.visible}
                confirmAction={() => this.onWizardConfirm()}
                abortAction={() => this.onWizardAbort()}>
                <TextInput
                    uuid={this.props.uuid}
                    text={this.props.text}
                    onSetCaret={(pos) => this.onSetInputCaret(pos)}
                    onChar={(char) => this.onInputChar(char)}
                />
            </OkCancelModal>
        </Row>
    }
}