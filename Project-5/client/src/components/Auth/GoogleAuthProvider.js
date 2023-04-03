import React, { createContext, useEffect, useMemo } from "react";
export const GoogleAuthContext = createContext();

function GoogleAuthProvider(props) {
	const clientId =
		"436866084784-qio70eakhv0sov1e35he60gg5g5tuun6.apps.googleusercontent.com";
	const clientSecret = "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";

	const contextValue = useMemo(
		() => ({ clientId: clientId, clientSecret: clientSecret }),
		[clientId]
	);

	return (
		<GoogleAuthContext.Provider value={contextValue}>
			{props.children}
		</GoogleAuthContext.Provider>
	);
}

export default GoogleAuthProvider;
