/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)\_layout` | `/(app)\userProfile` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)\_layout` | `/..\components\GoogleSignIn` | `/..\contexts\AuthContext` | `/..\enums\routes` | `/_sitemap` | `/explore` | `/login` | `/signup`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
