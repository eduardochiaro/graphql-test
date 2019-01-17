import Ship from './ship.model';
import Shipclass from '../shipclass/shipclass.model';

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const shipTypeDefs = `
 
  type Ship {
    id: ID!
    name: String!
    code: String

    shipclassId: String
    shipclass: Shipclass
  }
  input ShipFilterInput {
    limit: Int
  }
  # Extending the root Query type.
  extend type Query {
    ships(filter: ShipFilterInput): [Ship]
    ship(id: String!): Ship
  }
  # We do not need to check if any of the input parameters
  # exist with a "!" character. This is because mongoose will
  # do this for us, and it also means we can use the same
  # input on both the "addShip" and "editShip" methods.
  input ShipInput {
    name: String
    class: String
    code: String
    shipclassId: String
  }
  # Extending the root Mutation type.
  extend type Mutation {
    addShip(input: ShipInput!): Ship
    editShip(id: String!, input: ShipInput!): Ship
    deleteShip(id: String!): Ship
  }
`;

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const shipResolvers = {
  Query: {
    ships: async (_, { filter = {} }) => {
      const ships: any[] = await Ship.find({}, null, filter);
      // notice that I have ": any[]" after the "ships" variable?
      // That is because I am using TypeScript but you can remove
      // this and it will work normally with pure JavaScript
      return ships.map(ship => ship.toGraph());
    },
    ship: async (_, { id }) => {
      const ship: any = await Ship.findById(id);
      return ship.toGraph();
    },
  },
  Mutation: {
    addShip: async (_, { input }) => {
      const ship: any = await Ship.create(input);
      return ship.toGraph();
    },
    editShip: async (_, { id, input }) => {
      const ship: any = await Ship.findByIdAndUpdate(id, input);
      return ship.toGraph();
    },
    deleteShip: async (_, { id }) => {
      const ship: any = await Ship.findByIdAndRemove(id);
      return ship ? ship.toGraph() : null;
    },
  },
  Ship: {
    async shipclass(ship: { shipclassId: string }) {
      if (ship.shipclassId) {
        const shipclass: any = await Shipclass.findById(ship.shipclassId);
        return shipclass.toGraph();
      }
      return null;
    },
  },
};