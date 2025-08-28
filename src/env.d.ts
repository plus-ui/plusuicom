/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: {
      id: string;
      email: string;
      user_metadata?: {
        [key: string]: any;
      };
    } | null;
  }
}