"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNativeZodEnum = exports.handleZodEnum = exports.handleZodString = exports.handleZodNumber = exports.handleZodBoolean = void 0;
const handleZodString = (fieldOptions) => {
    return { ...fieldOptions, type: fieldOptions.type ?? 'text' };
};
exports.handleZodString = handleZodString;
const handleZodNumber = (fieldOptions) => {
    return {
        ...fieldOptions,
        inputMode: fieldOptions.inputMode ?? 'numeric',
        type: fieldOptions.type ?? 'number',
    };
};
exports.handleZodNumber = handleZodNumber;
const handleZodBoolean = (fieldOptions) => {
    return { ...fieldOptions, type: fieldOptions.type ?? 'checkbox' };
};
exports.handleZodBoolean = handleZodBoolean;
const handleZodEnum = (fieldOptions, fieldValue) => {
    const options = fieldValue._def.values.map(value => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
    }));
    if (fieldOptions.tag === 'select') {
        // handle select
        return {
            ...fieldOptions,
            options: fieldOptions.options ?? options,
            type: fieldOptions.type ?? 'select',
        };
    }
    else {
        // handle radio
        return {
            ...fieldOptions,
            type: fieldOptions.type ?? 'checkbox',
            options: fieldOptions.options ?? options,
        };
    }
};
exports.handleZodEnum = handleZodEnum;
const handleNativeZodEnum = (fieldOptions, fieldValue) => {
    const options = Object.entries(fieldValue._def.values).map(([key, value]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value,
    }));
    if (fieldOptions.tag === 'select') {
        // handle select
        return { ...fieldOptions, options: fieldOptions.options ?? options };
    }
    else {
        // handle radio
        return {
            ...fieldOptions,
            type: fieldOptions.type ?? 'checkbox',
            options: fieldOptions.options ?? options,
        };
    }
};
exports.handleNativeZodEnum = handleNativeZodEnum;
