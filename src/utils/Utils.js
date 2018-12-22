import {CANC} from "./Characters";

export function stringEquals(s1, s2) {
    if (s1 && !s2 || s2 && !s1) {
        return false;
    }
    if (!s1 && !s2) {
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

export function collectionsEquals(l1, l2) {
    if (l1 === l2 || l1 && !l2 || l2 && !l1) {
        return false;
    }
    if (l1.length !== l2.length) {
        return false;
    }
    let ok = true;
    l1.forEach(element => {
        ok &= l2.includes(element);
    });
    l2.forEach(element => {
        ok &= l1.includes(element);
    });
    return ok;
}

export function distribute(array, value) {
    let result = [];
    let partition = [];
    if (array) {
        array.forEach(element => {
            if (partition.length >= value) {
                result.push(partition);
                partition = [];
            }
            partition.push(element);
        });
        if (partition.length > 0) {
            result.push(partition);
        }
    }
    return result;
}

export function uuid() {
    return "UI_" + Math.random().toString(16).slice(2);
}

export class Utils {
    static nop() {
    }
}

export function iGet(map, namespace) {
    return map.getIn(namespace.split('.'));
}