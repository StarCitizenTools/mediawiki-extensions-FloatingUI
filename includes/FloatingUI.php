<?php

declare( strict_types=1 );

namespace MediaWiki\Extension\FloatingUI;

use Parser;
use PPFrame;

class FloatingUI {
	private static function getArg( $key, $args, $frame ) {
		return isset( $args[$key] ) ? $frame->expand( $args[$key] ) : '';
	}

	private static function parseWikitext( $wikitext, $parser, $frame ) {
		$wikitext = $parser->recursiveTagParseFully( $wikitext, $frame );
		$wikitext = $parser->stripOuterParagraph( $wikitext );
		return $wikitext;
	}

	public static function parserHook( Parser $parser, PPFrame $frame, $args ) {
		// Load Floating UI library
		$parser->getOutput()->addModules( [ 'ext.floatingUI.lib' ] );
		// Load main module used to parse HTML
		$parser->getOutput()->addModuleStyles( [ 'ext.floatingUI.init.styles' ] );
		$parser->getOutput()->addModules( [ 'ext.floatingUI' ] );

		/*
		$referenceArg = self::getArg( 0, $args, $frame );
		$floatingArg = self::getArg( 1, $args, $frame );

		// Parse into wikitext into HTML because we are not parsing the output
		$referenceHtml = self::parseWikitext( $referenceArg, $parser, $frame );
		$floatingHtml = self::parseWikitext( $floatingArg, $parser, $frame );

		$isInline = true;
		$wrapperTag = $isInline ? 'span' : 'div';

		$output = <<<HTML
			<$wrapperTag class='ext-floatingui-reference'>$referenceHtml</$wrapperTag>
			<$wrapperTag class='ext-floatingui-floating'>$floatingHtml</$wrapperTag>
		HTML;

		return [ $output, 'noparse' => true, 'isHTML' => true ];
		*/
	}
}
