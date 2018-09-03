import React from "react";

export default function Text(props){
    const color = props.color ? props.color.toHexString() : "#000000";
    return <span style={{color: color}}>{props.children}</span>;
}