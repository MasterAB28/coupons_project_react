import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<h1 className={"head"}>The Best Coupons Web &trade;</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;
