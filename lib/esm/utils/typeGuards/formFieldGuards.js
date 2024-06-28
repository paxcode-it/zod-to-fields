"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectOfFormFieldsArrays = exports.isInputEnumFieldOptions = exports.isInputNumberFieldOptions = exports.isInputStringFieldOptions = exports.isInputBooleanFieldOptions = exports.isGenericSingleFieldOptions = exports.isNestedObjectFieldOptions = exports.isFormFieldsArray = void 0;
function isFormFieldsArray(value) {
    if (!Array.isArray(value))
        return false;
    for (const elem of value) {
        const keyOfElem = Object.keys(elem)[0];
        const isNestedObjectWithFields = Object.keys(elem).length === 1 && 'fields' in elem[keyOfElem];
        if (isNestedObjectWithFields &&
            isNestedObjectFieldOptions(elem[keyOfElem])) {
            continue;
        }
        if (!isGenericSingleFieldOptions(elem)) {
            // Could add more checks for NestedObjectFieldOptions if needed.
            return false;
        }
    }
    return true;
}
exports.isFormFieldsArray = isFormFieldsArray;
// Checking if the value is a NestedObjectFieldOptions
function isNestedObjectFieldOptions(value, debugging) {
    if (debugging) {
        console.log('Checking: ', value);
    }
    if (typeof value !== 'object' || value === null) {
        if (debugging) {
            console.log('First check failed: Not an object or null');
        }
        return false;
    }
    if (Array.isArray(value) || Object.keys(value).length === 0) {
        if (debugging) {
            console.log('Second check failed: Is an array or empty object');
        }
        return false;
    }
    const isMainObjectHaveOneKey = Object.keys(value).length === 1;
    const keyOfElem = Object.keys(value)[0];
    const fieldsNested = value[keyOfElem];
    const hasFieldsNested = isMainObjectHaveOneKey && 'fields' in fieldsNested;
    const isObject = typeof value === 'object';
    const hasFields = hasFieldsNested || 'fields' in value;
    const isFormFieldsArrayPass = hasFields &&
        isFormFieldsArray(hasFieldsNested
            ? fieldsNested.fields
            : value.fields);
    if (debugging) {
        // console.log('isMainObjectHaveOneKey: ', isMainObjectHaveOneKey)
        // console.log('keyOfElem: ', keyOfElem)
        // console.log('fieldsNested: ', fieldsNested)
        // console.log('hasFieldsNested: ', hasFieldsNested)
        // console.log('hasFields: ', hasFields)
        console.log(`Element ${isObject ? 'Is an object' : 'Is not an object'}`);
        console.log(`Element ${hasFields ? 'Has fields' : 'Does not have fields'}`);
        console.log(`Element ${isFormFieldsArrayPass
            ? 'Is a FormFieldsArray'
            : 'Is not a FormFieldsArray'}`);
    }
    return isObject && hasFields && isFormFieldsArrayPass;
}
exports.isNestedObjectFieldOptions = isNestedObjectFieldOptions;
// Checking if the value is a GenericSingleFieldOptions
function isGenericSingleFieldOptions(value) {
    return (!isFormFieldsArray(value) &&
        !isNestedObjectFieldOptions(value) &&
        'tag' in value &&
        'type' in value);
}
exports.isGenericSingleFieldOptions = isGenericSingleFieldOptions;
// Specific checks for subtypes
function isInputBooleanFieldOptions(value) {
    return (value.tag === 'input' &&
        (value.type === 'checkbox' || value.type === 'radio'));
}
exports.isInputBooleanFieldOptions = isInputBooleanFieldOptions;
function isInputStringFieldOptions(value) {
    return (value.tag === 'input' &&
        ['url', 'text', 'password', 'search', 'tel', 'email'].includes(value.type));
}
exports.isInputStringFieldOptions = isInputStringFieldOptions;
function isInputNumberFieldOptions(value) {
    return value.tag === 'input' && value.type === 'number';
}
exports.isInputNumberFieldOptions = isInputNumberFieldOptions;
function isInputEnumFieldOptions(value) {
    return value.tag === 'select' && Array.isArray(value.options);
}
exports.isInputEnumFieldOptions = isInputEnumFieldOptions;
// Checking if the value is an object containing FormFieldsArrays
function isObjectOfFormFieldsArrays(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    return Object.values(value).every(isFormFieldsArray);
}
exports.isObjectOfFormFieldsArrays = isObjectOfFormFieldsArrays;
