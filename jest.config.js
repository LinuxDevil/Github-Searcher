const nextJest = require('next/jest');
const createJestConfig = nextJest({
    dir: './',
});
const customJestConfig = {
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/app(.*)$': '<rootDir>/src/app$1',
        '^@/components(.*)$': '<rootDir>/src/components$1',
        '^@/utils(.*)$': '<rootDir>/src/utils$1',
        '^@/state(.*)$': '<rootDir>/src/state$1',
        '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
        '^@/network(.*)$': '<rootDir>/src/network$1',
    }
};
module.exports = createJestConfig(customJestConfig);
