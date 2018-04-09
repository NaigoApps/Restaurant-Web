import React, {Component} from 'react';
import OkCancelModal from "../../../../widgets/OkCancelModal";
import FloatInput from "./FloatInput";

export default class HiddenFloatEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        if (this.props.onConfirm) {
            this.props.onConfirm(parseFloat(this.props.text));
        }
    }

    onWizardAbort() {
        if (this.props.onAbort) {
            this.props.onAbort();
        }
    }

    onShowModal() {
        if (this.props.onShowModal) {
            this.props.onShowModal();
        }
    }

    onInputChar(char) {
        if (this.props.onChar) {
            this.props.onChar(char);
        }
    }

    onInputChange(text) {
        if (this.props.onChange) {
            this.props.onChange(text);
        }
    }

    render() {
        return <OkCancelModal
            message={this.props.label}
            isValid={() => this.isValid()}
            visible={this.props.visible}
            confirmAction={() => this.onWizardConfirm()}
            abortAction={() => this.onWizardAbort()}>
            <FloatInput
                uuid={this.props.uuid}
                text={this.props.text}
                onChange={text => this.onInputChange(text)}
                onChar={char => this.onInputChar(char)}
            />
        </OkCancelModal>
    }
}