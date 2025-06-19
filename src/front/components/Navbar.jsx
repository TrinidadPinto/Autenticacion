import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export const Navbar = () => {
	const [isValid, setIsValid] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const checkToken = () => {
			const token = localStorage.getItem("jwt-token");
			setIsValid(!!token);
		};
		checkToken();
		window.addEventListener("storage", checkToken);
		return () => window.removeEventListener("storage", checkToken);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("jwt-token");
		localStorage.removeItem("user_id");
		window.dispatchEvent(new Event("storage"));
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Página principal</span>
				</Link>
				<div className="ml-auto">
					{location.pathname === "/private" && isValid ? (
						<button className="btn btn-danger" onClick={handleLogout}>
							Cerrar sesión
						</button>
					) : (
						<div className="d-flex flex-column flex-md-row">
							<Link to="/login">
								<button className="btn btn-outline-primary me-2">Iniciar sesión</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-primary">Registrarse</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};