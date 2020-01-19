module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
