export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

export function strcmp(s1, s2) {
    if (s1 < s2) return -1;
    if (s1 > s2) return +1;
    return 0;
}

export function findByUuid(array, uuid) {
    return array.find(e => e.uuid === uuid);
}

export function distribute(array, value) {
    let result = [];
    let partition = [];
    array.forEach(element => {
        if (partition.length >= value) {
            result.push(partition);
            partition = [];
        }
        partition.push(element);
    });
    if(partition.length > 0){
        result.push(partition);
    }
    return result;
}

export function uuid() {
    return Math.random().toString(16).slice(2);
}

export function camel(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
}

export function foo() {
}