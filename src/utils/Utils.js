import {CANC} from "./Characters";
import {List} from "immutable";

export function stringEquals(s1, s2){
    if(s1 && !s2 || s2 && !s1){
        return false;
    }
    if(!s1 && !s2){
        return true;
    }
    return s1.localeCompare(s2) === 0;
}

export function numberCompare(n1, n2) {
    if (n1 < n2) return -1;
    if (n1 > n2) return +1;
    return 0;
}

export function findByUuid(array, uuid) {
    return array.find(e => {
        return e.get('uuid') === uuid;
    });
}

export function findIndexByUuid(array, uuid) {
    return array.findIndex(e => e.get('uuid') === uuid);

}

export function collectionsEquals(l1, l2){
    if(l1 === l2 || l1 && !l2 || l2 && !l1){
        return false;
    }
    if(l1.size !== l2.size){
        return false;
    }
    let ok = true;
    l1.forEach(element => {
        ok &= l2.contains(element);
    });
    l2.forEach(element => {
        ok &= l1.contains(element);
    });
    return ok;
}

export function distribute(array, value) {
    let result = List();
    let partition = List();
    if(array) {
        array.forEach(element => {
            if (partition.size >= value) {
                result = result.push(partition);
                partition = List();
            }
            partition = partition.push(element);
        });
        if (partition.size> 0) {
            result = result.push(partition);
        }
    }
    return result;
}

export function uuid() {
    return Math.random().toString(16).slice(2);
}

export function foo() {
}

export function iGet(map, namespace){
    return map.getIn(namespace.split('.'));
}

export function iSet(map, namespace, value){
    return map.setIn(namespace.split('.'), value);
}

export function appendIntEditorChar(oldText, char) {
    if(char === CANC){
        return "";
    }
    if(oldText === "0"){
        oldText = "";
    }
    let newText = oldText + char;
    if(!isNaN(parseInt(newText))){
        return newText;
    }
    return oldText;
}