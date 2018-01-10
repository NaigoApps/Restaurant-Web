import React, {Component} from 'react';
import {uuid} from "../../utils/Utils";
import $ from "jquery";

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "modal_" + uuid()
        }
    }

    componentDidMount(){
        let component = this;
        $("#" + this.state.uuid).on("shown.bs.modal", function () {
            $("body").trigger("css-update");
        });
        $("#" + this.state.uuid).on("hidden.bs.modal", function () {
            $("body").trigger("css-update");
        });
        if(this.props.visible){
            $("#" + this.state.uuid).modal("show");
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevProps.visible && this.props.visible){
            $("#" + this.state.uuid).modal("show");
        }else if(prevProps.visible && !this.props.visible){
            $("#" + this.state.uuid).modal("hide");
        }
    }

    componentWillUnmount(){
        $("#" + this.state.uuid).modal("hide");
    }


    static modalClass(props){
        let classes = ["modal", "fade"];
        return classes.join(" ");
    }

    static modalDialogClass(props){
        let classes = ["modal-dialog"];
        if(props.lg){
            classes.push("modal-lg");
        }
        return classes.join(" ");
    }

    render() {
        return (
            <div className={Modal.modalClass(this.props)} id={this.state.uuid} data-backdrop="static"
                 data-keyboard="false">
                <div className={Modal.modalDialogClass(this.props)}>
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}