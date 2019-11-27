export function toCamelCase(str) {
    return str.replace(/_./g, m => m[1].toUpperCase());
}

export function toSnakeCase(str) {
    return str.replace(/[A-Z0-9]+/g, m => '_' + m.toLowerCase());
}
