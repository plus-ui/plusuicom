/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'plus-button': any;
    }
  }
}