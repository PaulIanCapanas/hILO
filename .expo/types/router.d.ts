/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/home` | `/(app)/userProfile` | `/(app)\_layout` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/..\components\GoogleSignIn` | `/..\components\UserDetail` | `/..\enums\routes` | `/_sitemap` | `/explore` | `/home` | `/login` | `/signup` | `/userProfile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
