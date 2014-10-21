if( window.top === window )
{
	window.addEventListener( 'keydown', onKeyDown, false );


	function onKeyDown( evt )
	{
		if( evt.keyCode == 84 && evt.metaKey && evt.shiftKey )
		{
			//console.log( 'keydown from tab: ' + document.location.host );
			safari.self.tab.dispatchMessage( 'OpenLastClosedTab' );

			evt.preventDefault();
			evt.stopPropagation();
			evt.stopImmediatePropagation();
		}
	}
}