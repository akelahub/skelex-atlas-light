const appJson = require('./app.json');

/** Project-page prefix, set only for the GitHub Pages export. */
const baseUrl = (process.env.EXPO_BASE_URL || '').trim().replace(/\/+$/, '');

/**
 * `static` pre-renders each route so a refresh of /record finds record.html.
 * Local `expo start` stays a single-page bundle unless EXPO_WEB_OUTPUT is set.
 */
const webOutput = process.env.EXPO_WEB_OUTPUT === 'static' ? 'static' : 'single';

/** @type {import('expo/config').ExpoConfig} */
const expo = {
  ...appJson.expo,
  web: {
    ...appJson.expo.web,
    output: webOutput,
  },
  experiments: {
    ...appJson.expo.experiments,
    ...(baseUrl ? { baseUrl } : {}),
  },
};

module.exports = { expo };
