import { Ability, ForbiddenError } from '@casl/ability';

export const actions = ['manage', 'create', 'read', 'update', 'delete'];
export const subjects = ['Article', 'all'];

export const can = ({ ability, action, subject }) =>
  ForbiddenError.from(ability).throwUnlessCan(action, subject);

export const createAbility = rules => new Ability(rules);

export const isAdmin = ability => ability.can('manage', 'all');
