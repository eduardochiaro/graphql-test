"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * Here is the our ship schema which will be used to
 * validate the data sent to our database.
 */
var shipSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    class: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
});
/**
 * This property will ensure our virtuals (including "id")
 * are set on the ship when we use it.
 */
shipSchema.set('toObject', { virtuals: true });
/**
 * This is a helper method which converts mongoose properties
 * from objects to strings, numbers, and booleans.
 */
shipSchema.method('toGraph', function toGraph() {
    return JSON.parse(JSON.stringify(this));
});
/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
exports.default = mongoose_1.default.model('Ship', shipSchema);
//# sourceMappingURL=ship.model.js.map