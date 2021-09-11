import { gql } from "@apollo/client";

export const ENTITY_QUERY = gql`
    query GetEntity {
        entity(id: 1) {
            id
            name
            type
        }
    }
`;
