"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultOptions = void 0;
const zod_1 = require("zod");
const setDefaultOptions = (fieldKey, fieldValue) => {
    const isEnum = fieldValue instanceof zod_1.z.ZodEnum || fieldValue instanceof zod_1.z.ZodNativeEnum;
    const tag = isEnum ? 'select' : 'input';
    const label = fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
    return {
        id: fieldKey,
        label,
        name: fieldKey,
        tag,
    };
};
exports.setDefaultOptions = setDefaultOptions;
