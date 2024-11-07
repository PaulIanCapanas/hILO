/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/home` | `/(app)/userProfile` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/_sitemap` | `/explore` | `/home` | `/login` | `/signup` | `/userProfile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
