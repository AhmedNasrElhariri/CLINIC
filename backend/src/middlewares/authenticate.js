import { AuthenticationError } from 'apollo-server-core';

export default async (resolve, root, args, context, info) => {
  jwt.verify(context.request.get('Authorization'), 'secret');
  // try {
  //   const token = jwt.verify(context.request.get('Authorization'), 'secret');
  // } catch (e) {
  //   return new AuthenticationError('Not authorised');
  // }
  const result = await resolve(root, args, context, info);
  return result;
};
