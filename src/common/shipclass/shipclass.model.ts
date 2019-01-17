import mongoose from 'mongoose';

/**
 * Here is the our user schema which will be used to
 * validate the data sent to our database.
 */
const shipclassSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
});

/**
 * This property will ensure our virtuals (including "id")
 * are set on the user when we use it.
 */
shipclassSchema.set('toObject', { virtuals: true });

/**
 * This is a helper method which converts mongoose properties
 * from objects to strings, numbers, and booleans.
 */
shipclassSchema.method('toGraph', function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
export default mongoose.model('Shipclass', shipclassSchema);