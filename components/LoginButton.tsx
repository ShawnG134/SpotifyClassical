export const LoginButton = () => {
	const handleLogin = () => {
		window.location.href = "/api/login";
	};

	return <button onClick={handleLogin}>Log in with Spotify</button>;
};
