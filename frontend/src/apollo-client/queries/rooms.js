import gql from 'graphql-tag';

export const LIST_ROOMS_DEFINITION = gql`
  {
    myRoomsDefinition {
      id
      name
    }
  }
`;

export const ADD_ROOM_DEFINITION = gql`
  mutation addRoomDefinition($roomDefinition: RoomInputDefinition!) {
    addRoomDefinition(roomDefinition: $roomDefinition) {
      id
      name
    }
  }
`;

export const EDIT_ROOM_DEFINITION = gql`
  mutation editRoomDefinition($roomDefinition: roomInputDefinition!) {
    editRoomDefinition(roomDefinition: $roomDefinition) {
      id
      name
    }
  }
`;
