import React, {Component} from 'react';
import OkCancelModal from "../../../../widgets/OkCancelModal";
import FloatInput from "./FloatInput";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";

export default class FloatEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        if(this.props.onConfirm) {
            this.props.onConfirm(parseFloat(this.props.text));
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
                <FloatInput
                    uuid={this.props.uuid}
                    text={this.props.text}
                    onSetCaret={(pos) => this.onSetInputCaret(pos)}
                    onChar={(char) => this.onInputChar(char)}
                />
            </OkCancelModal>
        </Row>
    }
}