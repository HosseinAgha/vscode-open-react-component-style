module.exports = {
  verifyConditions: [
    '@semantic-release/changelog',
    'semantic-release-vsce',
    '@semantic-release/github',
    '@semantic-release/git',
  ],
  prepare: {
    path: 'semantic-release-vsce',
    packageVsix: 'vscode-open-react-component-style.vsix',
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    'semantic-release-vsce',
    {
      path: '@semantic-release/github',
      assets: 'vscode-open-react-component-style.vsix',
    },
    [
      '@semantic-release/git',
      {
        assets: ['package.json'],
        message: 'release: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
