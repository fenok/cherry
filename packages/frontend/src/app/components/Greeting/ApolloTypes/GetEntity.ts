/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntityType } from "../../../../../ApolloTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetEntity
// ====================================================

export interface GetEntity_entity {
    __typename: "Entity";
    id: string;
    name: string;
    type: EntityType;
}

export interface GetEntity {
    entity: GetEntity_entity;
}
