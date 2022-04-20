const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        // Handle module aliases (this will be automatically configured for you soon)
        '^@page/(.*)$': '<rootDir>/pages/$1',
        '^@style/(.*)$': '<rootDir>/styles/$1',
        '^@type/(.*)$': '<rootDir>/types/$1',
        '^@element/(.*)$': '<rootDir>/components/elements/$1',
        '^@layout/(.*)$': '<rootDir>/components/layouts/$1',
        '^@module/(.*)$': '<rootDir>/components/modules/$1',
        '^@template/(.*)$': '<rootDir>/components/templates/$1',
        '^@constant/(.*)$': '<rootDir>/constants/$1',
        '^@context/(.*)$': '<rootDir>/contexts/$1',
        '^@hook/(.*)$': '<rootDir>/hooks/$1',
        '^@util/(.*)$': '<rootDir>/utils/$1',
        '^@api/(.*)$': '<rootDir>/apis/$1',
        '^@test/(.*)$': '<rootDir>/tests/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

