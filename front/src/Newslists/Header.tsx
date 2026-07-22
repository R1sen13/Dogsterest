import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header container">
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <NavLink to="/"
                            className={({ isActive }) =>
                                isActive ? 'header__nav-link active' : 'header__nav-link'
                            }>
                            Рекомендации
                        </NavLink>

                    </li>
                    <li className="header__nav-item">
                        <NavLink to="/favorite"
                            className={({ isActive }) =>
                                isActive ? 'header__nav-link active' : 'header__nav-link'
                            }>
                            Понравившееся
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;