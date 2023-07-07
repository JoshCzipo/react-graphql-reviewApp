"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dormSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    images: [{ type: String }],
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
});
exports.default = (0, mongoose_1.model)("Dorm", dormSchema);
//# sourceMappingURL=Dorms.js.map