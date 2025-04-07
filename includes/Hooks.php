<?php

declare( strict_types=1 );

namespace MediaWiki\Extension\FloatingUI;

use MediaWiki\Hook\ParserFirstCallInitHook;
use MediaWiki\Parser\Parser;

class Hooks implements ParserFirstCallInitHook {
	/**
	 * @see https://www.mediawiki.org/wiki/Manual:Hooks/ParserFirstCallInit
	 *
	 * @param Parser $parser
	 */
	public function onParserFirstCallInit( $parser ): void {
		$parser->setFunctionHook( 'floatingui', [ FloatingUI::class, 'parserHook' ], Parser::SFH_OBJECT_ARGS );
	}
}
