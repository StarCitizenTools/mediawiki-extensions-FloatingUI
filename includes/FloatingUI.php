<?php

declare( strict_types=1 );

namespace MediaWiki\Extension\FloatingUI;

use MediaWiki\Html\Html;
use MediaWiki\Parser\Parser;
use MediaWiki\Parser\PPFrame;

final class FloatingUI {
	private static function getArg( int|string $key, array $args, PPFrame $frame ): string {
		// Trim surrounding whitespace: with SFH_OBJECT_ARGS, MediaWiki passes arguments after the
		// first as raw, untrimmed PPNodes, so `{{#floatingui: a | b }}` would otherwise expand the
		// second argument to " b ". A leading space makes recursiveTagParseFully() emit a <pre>
		// block; MediaWiki's HTML tidy pass then moves that block out of the wrapping paragraph,
		// leaving the content span no longer adjacent to the reference span, so the client-side
		// findContentEl() can no longer locate it and the tooltip never gets wired up.
		return trim( $frame->expand( $args[$key] ?? '' ) );
	}

	private static function parseWikitext( string $wikitext, Parser $parser, PPFrame $frame ): string {
		$html = $parser->recursiveTagParseFully( $wikitext, $frame );
		return $parser->stripOuterParagraph( $html );
	}

	public static function parserHook( Parser $parser, PPFrame $frame, array $args ): array {
		$parserOutput = $parser->getOutput();
		$parserOutput->addModuleStyles( [ 'ext.floatingUI.init.styles' ] );
		$parserOutput->addModules( [ 'ext.floatingUI.lib', 'ext.floatingUI' ] );

		$referenceArg = self::getArg( 0, $args, $frame );
		$floatingArg = self::getArg( 1, $args, $frame );

		if ( $referenceArg === '' || $floatingArg === '' ) {
			return [ '' ];
		}

		// Parse wikitext into HTML up front because the parser-function output is returned as raw HTML.
		$referenceHtml = self::parseWikitext( $referenceArg, $parser, $frame );
		$floatingHtml = self::parseWikitext( $floatingArg, $parser, $frame );

		$output = Html::rawElement( 'span', [ 'class' => 'ext-floatingui-reference' ], $referenceHtml )
			. Html::rawElement( 'span', [ 'class' => 'ext-floatingui-content' ], $floatingHtml );

		return [ $output, 'noparse' => true, 'isHTML' => true ];
	}
}
