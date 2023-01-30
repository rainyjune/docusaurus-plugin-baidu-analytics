# docusaurus-plugin-baidu-analytics

Baidu Analytics plugin for Docusaurus.

```
npm i @rainyjune/docusaurus-plugin-baidu-analytics
```

Note: This plugin is inactive in development by default and active in production to avoid polluting the analytics statistics. If you want to activate it in development environment, please set the `isDebugMode` to `true`.

## Usage

docusaurus.config.js

```javascript
module.exports = {
  plugins: [
    [
      "@rainyjune/docusaurus-plugin-baidu-analytics",
      {
        trackingID: "xxxxxxxxxxx", // Your Baidu Analytics Tracking ID. Required.
        isDebugMode: false, // Enable debug mode or not. Optional, default to `false`.
      },
    ],
  ],
};
```
