import classes from './styles/LandingPage.module.css';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className={classes['hero-wrapper']}>
      <h1>
        Trolio is a dashboard and portfolio service for freelance media
        translastors/QCers which fetches data using Airtable API.
      </h1>
      <div className={classes['hero-container']}>
        <div>
          <div className={classes['hero-img']}>
            <img
              alt="illustration of a person pointing at a dashboard"
              width="300px"
              height="300px"
              src="./assets/images/dashboard-main-img.webp"
            />
            <a href="https://lovepik.com/images/png-analytics.html">
              Analytics Png vectors by Lovepik.com
            </a>
          </div>
          <div className={classes['hero-description']}>
            <h2>
              Manage your productivity as a freelance media translator/QCer
              based on comparable statistical figures visualized with graphs.
            </h2>
            <Link to={`/dashboard`}>Dashboard</Link>
          </div>
        </div>
        <div>
          <div className={classes['hero-description']}>
            <h2>
              Collect all the works you translated/QCed and display with their
              posters. You can also search and filter them by their title, job
              type, work form, work type and platform.
            </h2>
            <Link to={`/portfolio`}>Portfolio</Link>
          </div>
          <div className={classes['hero-img']}>
            <img
              alt="illustration of a person holding a portfolio and a big suitcase"
              width="300px"
              height="300px"
              src="./assets/images/portfolio-main-img.webp"
            />
            <a href="https://www.freepik.com/free-vector/portfolio-management-previous-projects-samples-works-catalog-skills-presentation-successful-graphic-designer-web-developer-cartoon-character_11667016.htm#query=illustration%20portfolio&position=0&from_view=keyword&track=ais">
              Image by vectorjuice
            </a>{' '}
            on Freepik
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
