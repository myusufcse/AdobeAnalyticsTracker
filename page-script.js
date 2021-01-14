window.addEventListener('getPageData', function(event) {
	var pageData = window._satellite
	? {
		satellite: {
			...(_satellite.property || {}),
			...(_satellite.buildInfo || {})
		}
	}
	: {};
	window.postMessage({ action: 'pageData', payload: pageData }, '*');
}, false);
