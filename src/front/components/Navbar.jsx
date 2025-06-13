import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const [isValid, setIsValid] = useState(false);
	const navigate = useNavigate();

	const checkToken = () => {
		console.log("Im check token");
		if (localStorage.getItem("jwt-token")) {
		setIsValid(true);
		} else {
		setIsValid(false);
		}
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Pagina principal</span>
				</Link>
				<div className="ml-auto">
					<form className="d-flex flex-column flex-md-row ms-auto" role="search">
						{isValid ? (
							<>
								<button className="btn btn-danger" onClick={() => {localStorage.removeItem("jwt-token"); localStorage.removeItem("user_id"); window.dispatchEvent(new Event("storage")); navigate("/"); }} >
									Cerrar Sesión
								</button>
							</>
						) : (
							<>
								<Link to="/Login">
									<button className="btn btn-alert">Iniciar Sesión</button>
								</Link>
								<Link to="/Signup">
									<button className="btn btn-primary">Registrarse</button>
								</Link>
							</>
						)}
					</form>
				</div>
			</div>
		</nav>
	);
};