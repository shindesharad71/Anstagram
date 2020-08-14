module.exports = {
	name: 'backend',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/backend',
	globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
};
