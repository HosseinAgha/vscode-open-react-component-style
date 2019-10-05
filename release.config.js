module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      'semantic-release-vsce',
      {
        packageVsix: 'vscode-open-react-component-style.vsix',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: 'vscode-open-react-component-style.vsix',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'release: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
