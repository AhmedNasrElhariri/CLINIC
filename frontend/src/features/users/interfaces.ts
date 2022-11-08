export interface User {
  allowedViews: Array<string>;
  avatar: string;
  id: string;
  language: string;
  name: string;
  organizationId: string;
  position: string;
  role: {
    permissions: Array<string>;
  };
}
