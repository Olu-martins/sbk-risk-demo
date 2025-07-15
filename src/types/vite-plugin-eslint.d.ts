declare module "vite-plugin-eslint" {
  export interface ESLintPluginOptions {
    cache?: boolean;
    cacheLocation?: string;
    context?: string;
    emitError?: boolean;
    emitWarning?: boolean;
    errorOnUnmatchedPattern?: boolean;
    eslintPath?: string;
    exclude?: string | string[];
    failOnError?: boolean;
    failOnWarning?: boolean;
    fix?: boolean;
    include?: string | string[];
    lintCommand?: string;
    overrideConfig?: Record<string | number | boolean>;
    throwOnError?: boolean;
    throwOnWarning?: boolean;
  }
  declare module "vite-plugin-eslint" {
    import { Plugin } from "vite";
    interface Options {
      include?: string[];
      exclude?: string[];
      emitWarning?: boolean;
      emitError?: boolean;
      failOnWarning?: boolean;
      failOnError?: boolean;
    }
    function eslint(options?: Options): Plugin;
    export default eslint;
  }
  function eslint(options?: ESLintPluginOptions): unknown;
  export default eslint;
}
