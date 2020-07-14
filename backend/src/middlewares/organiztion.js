import * as R from 'ramda';

export default async (resolve, root, args, context, info) => {
  const { organizationId } = context;
  const result = await resolve(root, args, context, info);
  return filterByOrganization(result, organizationId);
};

const filterByOrganization = (result, organizationId) => {
  if (!organizationId) return null;
  result = R.is(Array)(result) ? result : organizationId;
  return result.filter(r => r.organizationId === organizationId);
};
