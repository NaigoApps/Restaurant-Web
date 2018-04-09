import React, {Component} from 'react';
import SelectInput from "./SelectInput";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import OkCancelModal from "../../../widgets/OkCancelModal";
import Row from "../../../widgets/Row";

/**
 * Events:
 * - onSelect
 * - onDeselect
 * - onSelectPage
 *
 * - onShowModal
 * - onAbort
 * - onConfirm
 */

export default class SelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onConfirm(option) {
        if (this.props.onConfirm) {
            this.props.onConfirm(option);
        }
    }

    onAbort() {
        if (this.props.onAbort) {
            this.props.onAbort();
        }
    }

    onShowModal() {
        if (this.props.onShowModal) {
            this.props.onShowModal();
        }
    }

    onSelectPage(index) {
        if (this.props.onSelectPage) {
            this.props.onSelectPage(index);
        }
    }

    onSelect(option) {
        if (this.props.onSelect) {
            this.props.onSelect(option);
        }
    }

    onDeselect(option) {
        if (this.props.onDeselect) {
            this.props.onDeselect(option);
        }
    }

    renderOption(option) {
        if (!this.props.renderer) {
            return option;
        }
        return this.props.renderer(option);
    }

    findOption(option) {
        if (!this.props.id) {
            return this.props.options.find(opt => opt === option) || null;
        } else {
            return this.props.options.find(opt => this.props.id(opt) === option) || null;
        }
    }

    render() {
        const label = this.props.label;
        const visible = this.props.visible;
        const options = this.props.options;
        const value = this.props.value;

        return <Row align="center" topSpaced>
            <Column sm="2" right>
                {label}
            </Column>
            <Column>
                <Button
                    text={this.renderOption(this.findOption(value))}
                    commitAction={() => this.onShowModal()}
                />
                <OkCancelModal
                    isValid={!!value}
                    message={label}
                    visible={visible}
                    confirmAction={() => this.onConfirm(value)}
                    abortAction={() => this.onAbort()} lg>
                    <SelectInput
                        rows={this.props.rows}
                        cols={this.props.cols}
                        page={this.props.page}
                        id={this.props.id}
                        selected={value}
                        options={options}
                        renderer={this.props.renderer}
                        colorRenderer={this.props.colorRenderer}

                        onSelect={option => this.onSelect(option)}
                        onDeselect={(option) => this.onDeselect(option)}
                        onSelectPage={index => this.onSelectPage(index)}
                    />
                </OkCancelModal>
            </Column>
        </Row>
    }

}