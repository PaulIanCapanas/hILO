/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)\_layout` | `/..\components\GoogleSignIn` | `/..\enums\routes` | `/_sitemap` | `/explore` | `/login` | `/signup` | `/userprofile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
