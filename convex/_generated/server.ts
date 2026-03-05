/* eslint-disable */
/**
 * Generated utilities for implementing server-side Convex query and mutation functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import {
  queryGeneric,
  mutationGeneric,
  actionGeneric,
  internalQueryGeneric,
  internalMutationGeneric,
  internalActionGeneric,
  httpActionGeneric,
} from "convex/server";
import type {
  QueryBuilder,
  MutationBuilder,
  ActionBuilder,
  InternalQueryBuilder,
  InternalMutationBuilder,
  InternalActionBuilder,
  HttpActionBuilder,
} from "convex/server";
import type { DataModel } from "./dataModel.js";

export const query = queryGeneric as unknown as QueryBuilder<DataModel, "public">;
export const internalQuery = internalQueryGeneric as unknown as InternalQueryBuilder<DataModel>;
export const mutation = mutationGeneric as unknown as MutationBuilder<DataModel, "public">;
export const internalMutation = internalMutationGeneric as unknown as InternalMutationBuilder<DataModel>;
export const action = actionGeneric as unknown as ActionBuilder<DataModel, "public">;
export const internalAction = internalActionGeneric as unknown as InternalActionBuilder<DataModel>;
export const httpAction = httpActionGeneric as unknown as HttpActionBuilder;
