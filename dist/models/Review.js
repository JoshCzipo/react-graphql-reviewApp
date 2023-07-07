"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    dorm: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Dorm",
    },
});
exports.default = (0, mongoose_1.model)("Review", reviewSchema);
//# sourceMappingURL=Review.js.map