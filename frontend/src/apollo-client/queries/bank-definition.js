import gql from 'graphql-tag';

export const LIST_BANKS_DEFINITION = gql`
  {
    myBanksDefinition {
      id
      name
    }
  }
`;

export const ADD_BANK_DEFINITION = gql`
  mutation addBankDefinition($bankDefinition: BankInputDefinition!) {
    addBankDefinition(bankDefinition: $bankDefinition) {
      id
      name
    }
  }
`;

export const EDIT_BANK_DEFINITION = gql`
  mutation editBankDefinition($bankDefinition: BankInputDefinition!) {
    editBankDefinition(bankDefinition: $bankDefinition) {
      id
      name
    }
  }
`;
