import React from "react";

export default function Text(props) {
    const style = {};
    if (props.color) {
        style.color = props.color.toHexString();
    }
    return <span style={style}>{props.children}</span>;
}