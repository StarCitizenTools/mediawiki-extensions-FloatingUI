class FloatingUI {
	constructor( refEl, floatingEl ) {
		this.refEl = refEl;
		this.floatingEl = floatingEl;
		this.f = window.FloatingUIDOM;
		this.show = this.show.bind( this );
		this.hide = this.hide.bind( this );
	}

	update() {
		this.f.computePosition( this.refEl, this.floatingEl, {
			middleware: [
				this.f.offset( 4 ),
				this.f.autoPlacement()
			]
		} ).then( ( { x, y } ) => {
			Object.assign( this.floatingEl.style, {
				left: `${ x }px`,
				top: `${ y }px`
			} );
		} );
	}

	show() {
		this.floatingEl.style.display = 'block';
		document.body.appendChild( this.floatingEl );
		this.update();
	}

	hide() {
		this.floatingEl.style.display = '';
		this.floatingEl.remove();
	}

	attach() {
		[
			[ 'mouseenter', this.show ],
			[ 'mouseleave', this.hide ],
			[ 'focus', this.show ],
			[ 'blur', this.hide ]
		].forEach( ( [ event, listener ] ) => {
			this.refEl.addEventListener( event, listener );
		} );
	}
}

function init() {
	const refEls = document.querySelectorAll( '.ext-floatingui-reference' );

	refEls.forEach( ( refEl ) => {
		// Exit if the floating element is not next to the reference
		// TODO: Implement a way to define a floating element so that it can be placed somewhere else
		if ( !refEl.nextElementSibling || refEl.nextElementSibling.classList.contains( '.ext-floatingui-floating' ) ) {
			return;
		}

		const floatingEl = refEl.nextElementSibling;
		const instance = new FloatingUI( refEl, floatingEl );
		instance.attach();
	} );
}

init();
