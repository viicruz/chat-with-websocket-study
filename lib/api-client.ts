"use client";
import { treaty } from '@elysia/eden'
import type { ElysiaServer } from "@/server/src/";

export const apiClient = treaty<ElysiaServer>("http://localhost:3001");