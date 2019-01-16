import mongoose from 'mongoose';

/**
 * Here is the our ship schema which will be used to
 * validate the data sent to our database.
 */
const shipSchema = new mongoose.Schema({
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
shipSchema.method('toGraph', function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
export default mongoose.model('Ship', shipSchema);