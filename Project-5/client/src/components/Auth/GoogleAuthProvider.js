import React, { createContext, useEffect, useMemo } from "react";
export const GoogleAuthContext = createContext();

function GoogleAuthProvider(props) {
	const clientId =
		"ClientID";
	const clientSecret = "CLientSecret";

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
