import { Ability } from '@casl/ability';

export const isAdmin = ({ permissions = [] }) => {
  return new Ability(permissions).can('manage', 'all');
};
