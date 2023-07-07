import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} from "graphql";
import Review from "../models/Review";
import Dorm from "../models/Dorms";



export const reviewType = new GraphQLObjectType({
  name: "reviewType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    rating: { type: GraphQLNonNull(GraphQLFloat) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    dorm: { 
      type: GraphQLNonNull(dormType),
      async resolve(parent) {
        return await Dorm.findById(parent.dorm)
          },
        },
  }),
});

export const dormType = new GraphQLObjectType({
  name: "dormType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    info: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt)},
    images: { type: GraphQLList(GraphQLString) },
    reviews: {
      type: GraphQLList(reviewType),
      async resolve(parent) {
        return await Review.find({ dorm: parent.id });
      },
    },
  }),
});
