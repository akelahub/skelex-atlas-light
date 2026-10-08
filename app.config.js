const appJson = require('./app.json');

/** Drop trailing slashes without a backtracking regular expression. */
function withoutTrailingSlashes(value) {
  let end = value.length;
  while (end > 0 && value[end - 1] === '/') {
    end -= 1;
  }
  return value.slice(0, end);
}

/** Project-page prefix, set only for the GitHub Pages export. */
const baseUrl = withoutTrailingSlashes((process.env.EXPO_BASE_URL || '').trim());

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
