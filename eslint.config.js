'use strict';

const { defineConfig, globalIgnores } = require( 'eslint/config' );
const wikimedia = require( 'eslint-config-wikimedia/flat' );

module.exports = defineConfig( [
	globalIgnores( [
		'i18n/',
		'modules/lib/',
		'vendor/'
	] ),

	// modules/ runs in the browser and has its own config below
	{
		ignores: [ 'modules/**' ],
		extends: [ wikimedia( 'server' ) ]
	},

	// Code which runs in MediaWiki
	{
		files: [ 'modules/**' ],
		extends: [ wikimedia( 'client', 'mediawiki' ) ],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module'
		},
		rules: {
			'es-x/no-nullish-coalescing-operators': 'off',
			'jsdoc/no-undefined-types': 'off',
			'max-len': 'off'
		}
	}
] );
