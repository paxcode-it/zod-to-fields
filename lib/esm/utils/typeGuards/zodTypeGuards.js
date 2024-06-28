"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZodNativeEnum = exports.isZodEnum = exports.isZodBoolean = exports.isZodNumber = exports.isZodString = void 0;
const z = __importStar(require("zod"));
// Type Guard for ZodString
function isZodString(value) {
    return value instanceof z.ZodString;
}
exports.isZodString = isZodString;
// Type Guard for ZodNumber
function isZodNumber(value) {
    return value instanceof z.ZodNumber;
}
exports.isZodNumber = isZodNumber;
// Type Guard for ZodBoolean
function isZodBoolean(value) {
    return value instanceof z.ZodBoolean;
}
exports.isZodBoolean = isZodBoolean;
// Type Guard for ZodEnum
function isZodEnum(value) {
    return value instanceof z.ZodEnum;
}
exports.isZodEnum = isZodEnum;
// Type Guard for ZodNativeEnum
function isZodNativeEnum(value) {
    return value instanceof z.ZodNativeEnum;
}
exports.isZodNativeEnum = isZodNativeEnum;
