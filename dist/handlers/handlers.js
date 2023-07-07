"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema_1 = require("../schema/schema");
const mongoose_1 = require("mongoose");
const Review_1 = __importDefault(require("../models/Review"));
const Dorms_1 = __importDefault(require("../models/Dorms"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        //get all reviews
        reviews: {
            type: (0, graphql_1.GraphQLList)(schema_1.reviewType),
            async resolve() {
                return await Review_1.default.find();
            },
        },
        //get dorm by id
        dorm: {
            type: schema_1.dormType,
            args: { id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) } },
            async resolve(parent, { id }) {
                return await Dorms_1.default.findById(id);
            }
        },
        //get all dorms
        dorms: {
            type: (0, graphql_1.GraphQLList)(schema_1.dormType),
            async resolve() {
                return await Dorms_1.default.find();
            },
        },
    },
});
const mutations = new graphql_1.GraphQLObjectType({
    name: "mutations",
    fields: {
        //signup
        addReview: {
            type: schema_1.reviewType,
            args: {
                title: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                rating: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLFloat) },
                content: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                dorm: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            async resolve(parents, { title, rating, content, date, dorm, }) {
                let review;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    review = new Review_1.default({ title, content, date, rating, dorm, });
                    const existingDorm = await Dorms_1.default.findById(dorm);
                    if (!existingDorm)
                        return new Error("Dorm not found");
                    existingDorm.reviews.push(review);
                    await existingDorm.save({ session });
                    return await review.save({ session });
                }
                catch (err) {
                    return new Error(err);
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
        addDorm: {
            type: schema_1.dormType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                info: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                price: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
                images: { type: (0, graphql_1.GraphQLList)(graphql_1.GraphQLString) }
            },
            async resolve(parent, { name, info, price, images }) {
                const session = await (0, mongoose_1.startSession)();
                let dorm;
                try {
                    session.startTransaction({ session });
                    dorm = new Dorms_1.default({ name, info, price, images });
                    return await dorm.save({ session });
                }
                catch (err) {
                    return new Error(err);
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: mutations });
//# sourceMappingURL=handlers.js.map