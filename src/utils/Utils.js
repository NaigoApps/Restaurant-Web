export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

export function strcmp(s1, s2){
    if(s1 < s2) return -1;
    if(s1 > s2) return +1;
    return 0;
}

export function findByUuid(array, uuid){
    let result = null;
    array.forEach(entity => {
        if(entity.uuid === uuid){
            result = entity;
        }
    });
    return result;
}

export function uuid() {
    return Math.random().toString(16).slice(2);
}

export function camel(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
}

export function foo(){}