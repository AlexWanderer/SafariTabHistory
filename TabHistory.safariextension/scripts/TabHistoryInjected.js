if( window.top === window )
{
	window.addEventListener( 'keydown', onKeyDown, false );


	function onKeyDown( evt )
	{
		if( evt.keyCode == 84 && evt.metaKey && evt.shiftKey )
			safari.self.tab.dispatchMessage( 'OpenLastClosedTab' );
	}
}