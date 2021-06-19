import gql from 'graphql-tag';

export const LIST_COMPANYS_DEFINITION = gql`
  {
    myCompanysDefinition {
      id
      name
    }
  }
`;

export const ADD_COMPANY_DEFINITION = gql`
  mutation addCompanyDefinition($companyDefinition: CompanyInputDefinition!) {
    addCompanyDefinition(companyDefinition: $companyDefinition) {
      id
      name
    }
  }
`;

export const EDIT_COMPANY_DEFINITION = gql`
  mutation editCompanyDefinition($companyDefinition: CompanyInputDefinition!) {
    editCompanyDefinition(companyDefinition: $companyDefinition) {
      id
      name
    }
  }
`;
