"use client";
import { treaty } from '@elysia/eden'
import type { ElysiaServer } from "@/server/src/";
import { backendPath } from "@/utils/backend-path";

export const apiClient = treaty<ElysiaServer>(backendPath("/"));