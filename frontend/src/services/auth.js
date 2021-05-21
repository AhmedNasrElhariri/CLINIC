import { Ability } from '@casl/ability';

export const isAdmin = ({ permissions = [] }) => {
  console.log(permissions);
  return new Ability(permissions).can('manage', 'all');
};
