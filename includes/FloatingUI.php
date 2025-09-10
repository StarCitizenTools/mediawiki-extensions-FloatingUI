<?php

declare( strict_types=1 );

namespace MediaWiki\Extension\FloatingUI;

use MediaWiki\Html\Html;
use MediaWiki\Parser\Parser;
use MediaWiki\Parser\PPFrame;

class FloatingUI {
	/**
	 * Retrieves and expands the specified argument from the given arguments array using the provided key.
	 * TODO: Add union typehint (int|string) to $key when we drop PHP 7.4 support
	 *
	 * @param int|string $key The key to retrieve the argument from the arguments array.
	 * @param array $args The array of arguments containing the key-value pairs.
	 * @param PPFrame $frame The PPFrame object for frame-related operations.
	 * @return string The expanded argument value if found, otherwise an empty string.
	 */
	private static function getArg( $key, array $args, PPFrame $frame ): string {
		return $frame->expand( $args[$key] ?? '' );
	}

	/**
	 * Parses wikitext content into HTML format.
	 *
	 * @param string $wikitext The wikitext content to be parsed.
	 * @param Parser $parser The Parser object for parsing operations.
	 * @param PPFrame $frame The PPFrame object for frame-related operations.
	 * @return string The parsed HTML content.
	 */
	private static function parseWikitext( string $wikitext, Parser $parser, PPFrame $frame ): string {
		$html = $parser->recursiveTagParseFully( $wikitext, $frame );
		$html = $parser->stripOuterParagraph( $html );
		return $html;
	}

	/**
	 * Parser hook for FloatingUI extension.
	 *
	 * @param Parser $parser The parser object.
	 * @param PPFrame $frame The frame object.
	 * @param array $args The arguments array.
	 * @return array The parsed output.
	 */
	public static function parserHook( Parser $parser, PPFrame $frame, array $args ): array {
		// Load Floating UI library
		$parser->getOutput()->addModules( [ 'ext.floatingUI.lib' ] );
		// Load main module used to parse HTML
		$parser->getOutput()->addModuleStyles( [ 'ext.floatingUI.init.styles' ] );
		$parser->getOutput()->addModules( [ 'ext.floatingUI' ] );

		$referenceArg = self::getArg( 0, $args, $frame );
		$floatingArg = self::getArg( 1, $args, $frame );

		if ( $referenceArg == '' || $floatingArg == '' ) {
			return [];
		}

		// Parse into wikitext into HTML because we are not parsing the output
		$referenceHtml = self::parseWikitext( $referenceArg, $parser, $frame );
		$floatingHtml = self::parseWikitext( $floatingArg, $parser, $frame );

		$isInline = true;
		$wrapperTag = $isInline ? 'span' : 'div';

		$referenceElement = Html::rawElement( $wrapperTag, [ 'class' => 'ext-floatingui-reference' ], $referenceHtml );
		$contentElement = Html::rawElement( $wrapperTag, [ 'class' => 'ext-floatingui-content' ], $floatingHtml );
		$output = $referenceElement . $contentElement;

		return [ $output, 'noparse' => true, 'isHTML' => true ];
	}
}
