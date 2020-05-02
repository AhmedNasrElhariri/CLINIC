import { GraphQLScalarType } from 'graphql';
const jsonScalarType = new GraphQLScalarType({
  name: 'JSON',
  description: 'json',
  serialize(value) {
    return JSON.parse(value);
  },
  parseValue(value) {
    return JSON.stringify(value);
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.Int:
    }
  },
});

export default jsonScalarType;
