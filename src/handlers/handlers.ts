import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
} from "graphql";

import { dormType, reviewType } from "../schema/schema";
import { Document, startSession } from "mongoose";
import Review from "../models/Review";
import Dorm from "../models/Dorms";



type DocumentType = Document<any, any, any>;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    

    //get all reviews
    reviews: {
      type: GraphQLList(reviewType),
      async resolve() {
        return await Review.find();
      },
    },

    //get dorm by id
    dorm: {
      type: dormType,
      args: { id: {type: GraphQLNonNull(GraphQLID) }},
      async resolve( parent, {id}) {
        return await Dorm.findById(id)
      }
    },


    //get all dorms
    dorms: {
      type: GraphQLList(dormType),
      async resolve() {
        return await Dorm.find();
      },
    },

  },
});


const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //signup
    
    addReview: {
      type: reviewType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLFloat) },
        content: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        dorm: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parents, { title, rating, content, date, dorm, }) {
        let review: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });

          review = new Review({ title, content, date, rating, dorm, });
          
          const existingDorm = await Dorm.findById(dorm)

          
          if(!existingDorm) return new Error("Dorm not found")

          
          existingDorm.reviews.push(review)

          
          await existingDorm.save({ session });

          return await review.save({ session });
        } catch (err) {
          return new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },

    

    addDorm: {
      type: dormType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        info: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        images: { type: GraphQLList(GraphQLString) }
      },
      async resolve(parent, { name, info, price, images}) {
        const session = await startSession();
        let dorm: DocumentType;
        try {
          session.startTransaction({ session });
          dorm = new Dorm({ name, info, price, images });
          return await dorm.save({ session });
        } catch (err) {
          return new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
