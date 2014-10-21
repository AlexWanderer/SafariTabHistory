var tabStack = [];
var maxHistoryStack = 20;



function openLastClosedTab()
{
	var url = tabStack.pop();
	var tab = safari.application.activeBrowserWindow.openTab();
	tab.url = url;

	//console.log( 'pop: ' + url );
}


// messages
function onMessage( evt )
{
	if( evt.name == 'OpenLastClosedTab' && tabStack.length > 0 )
		openLastClosedTab();
}


// context menu helpers
function onValidate( evt )
{
	evt.target.disabled = tabStack.length == 0;
}


function onCommand( evt )
{
	if( evt.command = 'LastClosedTab' )
		openLastClosedTab()
}



// SafariCloseEvent
function onCloseTabOrWindow( evt )
{
	// could be a tab or a window
	if( evt.target instanceof SafariBrowserTab )
	{
		if( evt.target.url != null && evt.target.url != '' && evt.target.url.indexOf( 'http' ) == 0 )
		{
			//console.log( 'push: ' + evt.target.url );
			tabStack.push( evt.target.url );

			if( tabStack.length > maxHistoryStack )
				tabStack = tabStack.slice( 0, maxHistoryStack );
		}
	}
	else
	{
		// TODO: add logic to deal with windows
		//console.log( 'target is: ' + evt.target );
	}
}




// message
safari.application.addEventListener( 'message', onMessage, false );

// context menu item
safari.application.addEventListener( 'validate', onValidate, false );
safari.application.addEventListener( 'command', onCommand, false );

// close handler
safari.application.addEventListener( 'close', onCloseTabOrWindow, true );
