// TODO: Maybe we should give each floating element an unique ID
const FLOATING_EL_ID = 'ext-floatingui-floating';
const FLOATING_EL_VISIBLE_CLASS = 'ext-floatingui-floating--visible';

class FloatingUI {
	constructor( elements ) {
		this.referenceEl = elements.reference;
		this.contentEl = elements.content;
		this.floatingEl = elements.floating;
		this.floatingContentEl = elements.floatingContent;
		this.arrowEl = elements.arrow;
		this.f = window.FloatingUIDOM;
		this.update = this.update.bind( this );
		this.show = this.show.bind( this );
		this.hide = this.hide.bind( this );
	}

	roundByDPR( value ) {
		const dpr = window.devicePixelRatio || 1;
		return Math.round( value * dpr ) / dpr;
	}

	update() {
		this.f.computePosition( this.referenceEl, this.floatingEl, {
			placement: 'top',
			middleware: [
				this.f.autoPlacement( {
					allowedPlacements: [ 'top', 'bottom' ]
				} ),
				this.f.shift( {
					padding: 16
				} ),
				this.f.arrow( {
					element: this.arrowEl,
					padding: 4
				} )
			]
		} ).then( ( { x, y, placement, middlewareData } ) => {
			Object.assign( this.floatingEl.style, {
				transform: `translate(${ this.roundByDPR( x ) }px,${ this.roundByDPR( y ) }px)`
			} );
			this.floatingEl.dataset.mwExtFloatinguiPlacement = placement;

			if ( middlewareData.arrow ) {
				const { x: arrowX, y: arrowY } = middlewareData.arrow;

				const staticSide = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right'
				}[ placement.split( '-' )[ 0 ] ];

				Object.assign( this.arrowEl.style, {
					// eslint-disable-next-line eqeqeq
					left: arrowX != null ? `${ this.roundByDPR( arrowX ) }px` : '',
					// eslint-disable-next-line eqeqeq
					top: arrowY != null ? `${ this.roundByDPR( arrowY ) }px` : '',
					right: '',
					bottom: '',
					[ staticSide ]: '-4px'
				} );
			}
		} );
	}

	isRelatedTarget( el ) {
		return this.referenceEl.contains( el ) || this.floatingEl.contains( el );
	}

	show() {
		this.floatingContentEl.innerHTML = this.contentEl.innerHTML;
		document.body.append( this.floatingEl );
		this.cleanup = this.f.autoUpdate(
			this.referenceEl,
			this.floatingEl,
			this.update
		);
		this.referenceEl.setAttribute( 'aria-expanded', 'true' );
		this.referenceEl.setAttribute( 'aria-controls', FLOATING_EL_ID );
		// eslint-disable-next-line mediawiki/class-doc
		this.floatingEl.classList.add( FLOATING_EL_VISIBLE_CLASS );
		[
			[ 'mouseleave', this.hide ],
			[ 'blur', this.hide ]
		].forEach( ( [ event, listener ] ) => {
			this.floatingEl.addEventListener( event, listener );
		} );
	}

	hide( event ) {
		if ( this.isRelatedTarget( event.relatedTarget || event.target ) ) {
			return;
		}
		this.referenceEl.setAttribute( 'aria-expanded', 'false' );
		this.referenceEl.removeAttribute( 'aria-controls' );
		// eslint-disable-next-line mediawiki/class-doc
		this.floatingEl.classList.remove( FLOATING_EL_VISIBLE_CLASS );
		// Delay the removal of the element by 250ms + 250ms (transition delay + transition duration)
		setTimeout( () => {
			if ( !this.floatingEl.classList.contains( FLOATING_EL_VISIBLE_CLASS ) ) {
				this.floatingEl.remove();
				this.cleanup();
			}
		}, 500 );
	}

	setupAttributes() {
		// Allow the reference element to be focusable
		this.referenceEl.setAttribute( 'tabindex', '0' );
		this.referenceEl.setAttribute( 'aria-expanded', 'false' );
		// Hide the content element from accessiblity tree
		this.contentEl.setAttribute( 'aria-hidden', 'true' );
	}

	init() {
		this.setupAttributes();
		[
			[ 'mouseenter', this.show ],
			[ 'mouseleave', this.hide ],
			[ 'focus', this.show ],
			[ 'blur', this.hide ]
		].forEach( ( [ event, listener ] ) => {
			this.referenceEl.addEventListener( event, listener );
		} );
	}
}

// Create a multiple shared elements to be reused
function createSharedEls() {
	const floatingEl = document.createElement( 'div' );
	floatingEl.id = FLOATING_EL_ID;
	floatingEl.classList.add( 'ext-floatingui-floating' );
	floatingEl.setAttribute( 'tabindex', '0' );

	const innerEl = document.createElement( 'div' );
	innerEl.classList.add( 'ext-floatingui-floating-inner' );

	const floatingContentEl = document.createElement( 'div' );
	floatingContentEl.classList.add( 'ext-floatingui-floating-content' );

	const arrowEl = document.createElement( 'div' );
	arrowEl.classList.add( 'ext-floatingui-floating-arrow' );

	innerEl.append( floatingContentEl, arrowEl );
	floatingEl.append( innerEl );

	return {
		arrow: arrowEl,
		floating: floatingEl,
		floatingContent: floatingContentEl
	};
}

function init() {
	const referenceEls = document.querySelectorAll( '.ext-floatingui-reference' );
	const sharedEls = createSharedEls();

	referenceEls.forEach( ( referenceEl ) => {
		// Exit if the floating element is not next to the reference
		// TODO: Implement a way to define a floating element so that it can be placed somewhere else
		if ( !referenceEl.nextElementSibling || referenceEl.nextElementSibling.classList.contains( '.ext-floatingui-content' ) ) {
			return;
		}

		const contentEl = referenceEl.nextElementSibling;

		const instance = new FloatingUI( Object.assign( sharedEls, {
			reference: referenceEl,
			content: contentEl
		} ) );
		instance.init();
	} );
}

init();
