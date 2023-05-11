import "./PageNotFound.css";
import page404 from "./page_not_found.jpg";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<h3>Oops! The page you are looking for was not found!</h3>
            <img src={page404} alt="404 page not found" />
        </div>
    );
}

export default PageNotFound;
