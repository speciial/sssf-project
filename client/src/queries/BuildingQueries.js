import { gql } from "apollo-boost";

const addBuildingToUser = gql`
  mutation addBuildingToUser($User: ID!, $Building: ID!) {
    addBuildingToUser(User: $User, Building: $Building) {
      id
    }
  }
`;

export { addBuildingToUser };
