"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dormType = exports.reviewType = void 0;
const graphql_1 = require("graphql");
const Review_1 = __importDefault(require("../models/Review"));
const Dorms_1 = __importDefault(require("../models/Dorms"));
exports.reviewType = new graphql_1.GraphQLObjectType({
    name: "reviewType",
    fields: () => ({
        id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
        rating: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLFloat) },
        title: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        content: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        dorm: {
            type: (0, graphql_1.GraphQLNonNull)(exports.dormType),
            async resolve(parent) {
                return await Dorms_1.default.findById(parent.dorm);
            },
        },
    }),
});
exports.dormType = new graphql_1.GraphQLObjectType({
    name: "dormType",
    fields: () => ({
        id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
        name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        info: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        price: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        images: { type: (0, graphql_1.GraphQLList)(graphql_1.GraphQLString) },
        reviews: {
            type: (0, graphql_1.GraphQLList)(exports.reviewType),
            async resolve(parent) {
                return await Review_1.default.find({ dorm: parent.id });
            },
        },
    }),
});
//# sourceMappingURL=schema.js.map