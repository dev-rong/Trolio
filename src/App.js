import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Airtable from 'airtable';
import DashboardIcon from './Icons/DashboardIcon';
import DashboardFillIcon from './Icons/DashboardFillIcon';
import PortfolioIcon from './Icons/PortfolioIcon';
import PortfolioFillIcon from './Icons/PortfolioFillIcon';
import PortfolioPage from './components/portfolio/PortfolioPage';
import {
  Container,
  Header,
  IconContainer,
  Main,
  Navigation,
  ToggleNav,
} from './components/styles/AppStyle';
import Logo from './Logo.tsx';

const lazyRetry = function (componentImport, name) {
  return new Promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem(`retry-${name}-refreshed`) || 'false'
    );
    componentImport()
      .then((component) => {
        window.sessionStorage.setItem('retry-lazy-refreshed', 'false');
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          window.sessionStorage.setItem('retry-lazy-refreshed', 'true');
          return window.location.reload();
        }
        reject(error);
      });
  });
};
const LandingPage = lazy(() =>
  lazyRetry(() => import('./components/LandingPage'))
);
const Dashboard = lazy(() =>
  lazyRetry(() => import('./components/dashboard/Dashboard'))
);
const Portfolio = lazy(() =>
  lazyRetry(() => import('./components/portfolio/Portfolio'))
);
function App() {
  let location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const handleResize = () => {
    if (window.innerWidth <= 768 && showNav) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };
  const toggleNavHandler = useCallback(() => {
    setShowNav((showNav) => !showNav);
  }, []);
  useEffect(() => {
    async function fetchKey() {
      const url = `/.netlify/functions/getRecords`;
      try {
        const secrets = await fetch(url).then((res) => res.json());
        const base = new Airtable({
          apiKey: secrets.key,
        }).base(secrets.base)('July');
        base
          .select({
            view: 'Grid view',
            sort: [
              {
                field: 'title',
                direction: 'asc',
              },
              {
                field: 'deadline',
                direction: 'asc',
              },
            ],
          })
          .eachPage((records, fetchNextPage) => {
            setJobs(records);
            fetchNextPage();
          });
      } catch (err) {
        let error = {
          statusCode: err.statusCode || 500,
          body: JSON.stringify({ error: err.message }),
        };
        console.log(error);
      }
    }
    fetchKey();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  return (
    <div className="App">
      <Container showNav={showNav}>
        <Header>
          <Link to="/" aria-label="go home">
            <div>
              <Logo />
            </div>
          </Link>
        </Header>
        <Main>
          <Suspense
            fallback={
              <div style={{ color: '#FFFFFF', fontSize: '2rem' }}>
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard jobs={jobs} />} />
              <Route path="/portfolio" element={<Portfolio jobs={jobs} />} />
              <Route
                path="/portfolio/:pId"
                element={<PortfolioPage jobs={jobs} />}
              />
            </Routes>
          </Suspense>
        </Main>
      </Container>
      <Navigation showNav={showNav}>
        <IconContainer>
          <li>
            <Link to="/dashboard">
              {location.pathname === '/dashboard' ? (
                <DashboardFillIcon size={36} />
              ) : (
                <DashboardIcon size={36} color="#000000" />
              )}
              <h2>Dashboard</h2>
            </Link>
          </li>
        </IconContainer>
        <IconContainer>
          <li>
            <Link to="portfolio">
              {location.pathname === '/portfolio' ? (
                <PortfolioFillIcon size={36} />
              ) : (
                <PortfolioIcon size={36} color="#000000" />
              )}
              <h2>Portfolio</h2>
            </Link>
          </li>
        </IconContainer>
      </Navigation>
      <ToggleNav showNav={showNav} onClick={toggleNavHandler} />
    </div>
  );
}
export default App;
