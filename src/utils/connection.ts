import { connect } from 'mongoose'


export const connectToDatabase = async () => {
    try {
        await connect(`mongodb+srv://Admin:${process.env.MONGODB_PASSWORD}@cluster0.los00sm.mongodb.net/?retryWrites=true&w=majority`)
    }catch (err) {
        console.log(err)
        return err
    }
}