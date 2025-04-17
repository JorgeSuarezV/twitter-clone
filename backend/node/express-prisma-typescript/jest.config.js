module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    rootDir: '.',
    moduleNameMapper: {
        '@utils': '<rootDir>/src/utils/index.ts',
        '@domains/(.*)': '<rootDir>/src/domains/$1',
        '@router': '<rootDir>/src/router/index.ts'
    }
};
