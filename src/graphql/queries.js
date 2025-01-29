/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPet = /* GraphQL */ `
  query GetPet($id: ID!) {
    getPet(id: $id) {
      id
      name
      breed
      age
      about
      color
      image
      rating
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPets = /* GraphQL */ `
  query ListPets(
    $filter: ModelPetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        breed
        age
        about
        color
        image
        rating
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
