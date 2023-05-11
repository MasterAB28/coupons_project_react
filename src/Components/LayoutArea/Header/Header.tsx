import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
			<h1>The Best Coupons Web &trade;</h1>
        </div>
    );
}

export default Header;
