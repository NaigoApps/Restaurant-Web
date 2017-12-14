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

    render() {
        return (
            <div className={Modal.modalClass(this.props)} id={this.state.uuid} data-backdrop="static"
                 data-keyboard="false">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}