class FloatingUI {
	constructor( elements ) {
		this.referenceEl = elements.reference;
		this.contentEl = elements.content;
		this.floatingEl = elements.floating;
		this.floatingContentEl = elements.floatingContent;
		this.arrowEl = elements.arrow;
		this.f = window.FloatingUIDOM;
		this.show = this.show.bind( this );
		this.hide = this.hide.bind( this );
	}

	update() {
		this.f.computePosition( this.referenceEl, this.floatingEl, {
			middleware: [
				this.f.offset( 4 ),
				this.f.autoPlacement(),
				this.f.arrow( { element: this.arrowEl } )
			]
		} ).then( ( { x, y, placement, middlewareData } ) => {
			Object.assign( this.floatingEl.style, {
				left: `${ x }px`,
				top: `${ y }px`
			} );

			if ( middlewareData.arrow ) {
				const { x: arrowX, y: arrowY } = middlewareData.arrow;

				Object.assign( this.arrowEl.style, {
					left: x !== null ? `${ x }px` : '',
					top: y !== null ? `${ y }px` : ''
				} );

				const staticSide = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right'
				}[ placement.split( '-' )[ 0 ] ];

				Object.assign( this.arrowEl.style, {
					left: arrowX !== null ? `${ arrowX }px` : '',
					top: arrowY !== null ? `${ arrowY }px` : '',
					right: '',
					bottom: '',
					[ staticSide ]: '-4px'
				} );
			}
		} );
	}

	show() {
		this.floatingContentEl.innerHTML = this.contentEl.innerHTML;
		document.body.append( this.floatingEl );
		this.update();
	}

	hide() {
		this.floatingContentEl.innerHTML = '';
		this.floatingEl.remove();
	}

	attach() {
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
	floatingEl.classList.add( 'ext-floatingui-floating' );

	const floatingContentEl = document.createElement( 'div' );
	floatingContentEl.classList.add( 'ext-floatingui-floating-content' );

	const arrowEl = document.createElement( 'div' );
	arrowEl.classList.add( 'ext-floatingui-floating-arrow' );

	floatingEl.append( floatingContentEl, arrowEl );

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
		instance.attach();
	} );
}

init();
