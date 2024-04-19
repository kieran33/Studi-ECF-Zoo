import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../image/logo-zoo-ecf.png';

const Navigation = () => {

    const navigate = useNavigate();

    const directionConnexion = () => {
        navigate("/connexion");
    }

    const directionAccueil = () => {
        navigate("/");
    };

    return (
        <div className="barre_navigation_global">
            <div>
                <img src={logo} style={{ cursor: 'pointer' }} width="50" height="auto" atl="logo zoo ecf"
                    onClick={directionAccueil}
                />
            </div>
            <div className="barre_navigation_onglet">
                <NavLink to={"/"}>
                    Accueil
                </NavLink>
                <NavLink to={"/animaux"}>
                    Animaux
                </NavLink>
                <NavLink to={"/habitats"}>
                    Habitats
                </NavLink>
                <NavLink to={"/services"}>
                    Services
                </NavLink>
                <NavLink to={"/contact"}>
                    Contact
                </NavLink>
                <button className="bouton_zoo" onClick={directionConnexion}>Espace pro</button>
            </div>
        </div>
    );
};

export default Navigation;