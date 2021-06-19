import gql from 'graphql-tag';

export const LIST_COMPANYS_SESSION_DEFINITION = gql`
  {
    myCompanysSessionDefinition {
      id
      name
      price
      company{
          id
          name
      }
    }
  }
`;

export const ADD_COMPANY_SESSION_DEFINITION = gql`
  mutation addCompanySessionDefinition($companySessionDefinition: CompanySessionInputDefinition!) {
    addCompanySessionDefinition(companySessionDefinition: $companySessionDefinition) {
      id
      name
    }
  }
`;

export const EDIT_COMPANY_SESSION_DEFINITION = gql`
  mutation editCompanySessionDefinition($companySessionDefinition: CompanySessionInputDefinition!) {
    editCompanySessionDefinition(companySessionDefinition: $companySessionDefinition) {
      id
      name
    }
  }
`;
