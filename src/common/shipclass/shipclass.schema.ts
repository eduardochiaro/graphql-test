import Shipclass from './shipclass.model';

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const shipclassTypeDefs = `
  type Shipclass {
    id: ID!
    name: String!
    year: Int
  }
  input ShipclassInput {
    id: String
    name: String
    year: Int
  }
  input ShipclassFilterInput {
    limit: Int
  }
  # Extending the root Query type.
  extend type Query {
    shipclasses(filter: ShipclassFilterInput): [Shipclass]
    shipclass(id: String!): Shipclass
  }
  # Extending the root Mutation type.
  extend type Mutation {
    addShipclass(input: ShipclassInput!): Shipclass
  }
`;

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const shipclassResolvers: any = {
  Query: {
    async shipclasses(_, { filter }) {
      const shipclasses: any[] = await Shipclass.find({}, null, filter);
      return shipclasses.map(shipclass => shipclass.toGraph());
    },
    async shipclass(_, { id }) {
      const shipclass: any = await Shipclass.findById(id);
      return shipclass.toGraph();
    },
  },
  Mutation: {
    async addShipclass(_, { input }) {
      const shipclass: any = await Shipclass.create(input);
      return shipclass.toGraph();
    },
  },
};