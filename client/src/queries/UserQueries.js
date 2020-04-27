import { gql } from "apollo-boost";

const Login = gql`
  query AdLogindUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      FirstName
      LastName
      Username
      Email
      Token
      Money
      Materials {
        id
        Material {
          id
          Name
          Size
          Weight
          Picture
          CraftingRecipe {
            id
          }
        }
        Quantity
      }
      Buildings {
        id
        Name
        Cost
        Picture
        MaterialID {
          id
        }
        CraftingRecipe {
          id
        }
      }
    }
  }
`;

const addUserMutation = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      FirstName: $firstName
      LastName: $lastName
      Username: $username
      Email: $email
      Password: $password
    ) {
      id
      FirstName
      LastName
      Username
      Email
      Money
    }
  }
`;

const userQuery = gql`
  {
    user {
      id
      FirstName
      LastName
      Username
      Email
      Money
      Materials {
        id
        Material {
          id
          Name
          Size
          Weight
          Picture
          CraftingRecipe {
            id
            Material {
              id
            }
            Quantity
          }
        }
        Quantity
      }
    }
  }
`;

export { Login, addUserMutation, userQuery };
