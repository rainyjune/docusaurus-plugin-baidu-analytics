"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
function pluginBaiduAnalytics(context, options) {
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
exports.default = pluginBaiduAnalytics;
const pluginOptionsSchema = utils_validation_1.Joi.object({
    trackingID: utils_validation_1.Joi.string().required(),
    isDebugMode: utils_validation_1.Joi.boolean().default(false),
});
function validateOptions({ validate, options, }) {
    return validate(pluginOptionsSchema, options);
}
exports.validateOptions = validateOptions;
