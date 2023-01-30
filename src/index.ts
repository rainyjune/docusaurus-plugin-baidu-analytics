import { Joi } from "@docusaurus/utils-validation";
import type {
  LoadContext,
  Plugin,
  OptionValidationContext,
} from "@docusaurus/types";
import type { PluginOptions, Options } from "./options";

export default function pluginBaiduAnalytics(
  context: LoadContext,
  options: PluginOptions
): Plugin {
  const { isDebugMode, trackingID } = options;
  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "docusaurus-plugin-baidu-analytics",

    contentLoaded({ actions }) {
      actions.setGlobalData(options);
    },

    getClientModules() {
      return isProd || isDebugMode ? ["./baidu"] : [];
    },

    injectHtmlTags() {
      if (!isProd && !isDebugMode) {
        return {};
      }
      return {
        // Preconnect to Baidu analytics.
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "https://hm.baidu.com",
            },
          },
          {
            tagName: "script",
            innerHTML: `
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?${trackingID}";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);`,
          },
        ],
      };
    },
  };
}

const pluginOptionsSchema = Joi.object<PluginOptions>({
  trackingID: Joi.string().required(),
  isDebugMode: Joi.boolean().default(false),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}

export type { PluginOptions, Options };
