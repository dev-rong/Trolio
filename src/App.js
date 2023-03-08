import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Airtable from 'airtable';
import DashboardIcon from './Icons/DashboardIcon';
import DashboardFillIcon from './Icons/DashboardFillIcon';
import PortfolioIcon from './Icons/PortfolioIcon';
import PortfolioFillIcon from './Icons/PortfolioFillIcon';
import {
  Container,
  Header,
  IconContainer,
  Main,
  Navigation,
  ToggleNav,
} from './components/styles/AppStyle';
import './App.css';
import Logo from './Logo.tsx';

const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Portfolio = lazy(() => import('./components/portfolio/Portfolio'));
const PortfolioPage = lazy(() =>
  import('./components/portfolio/PortfolioPage')
);

function App() {
  let location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const toggleNavHandler = useCallback(() => {
    setShowNav((showNav) => !showNav);
  }, []);
  useEffect(() => {
    async function fetchKey() {
      const url = `/.netlify/functions/getRecords`;
      try {
        const records = await fetch(url).then((res) => res.json());
        const base = new Airtable({
          apiKey: records.key,
        }).base(records.base)('July');
        return base;
      } catch (err) {
        let error = {
          statusCode: err.statusCode || 500,
          body: JSON.stringify({ error: err.message }),
        };
        console.log(error);
      }
    }
    fetchKey()
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
  }, []);
  return (
    <div className="App">
      <Container showNav={showNav}>
        <Header>
          <Link to="/" style={{ position: 'absolute', zIndex: 1000 }}>
            <h1
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Logo />
            </h1>
          </Link>
        </Header>
        <Main>
          <Suspense
            fallback={
              <div style={{ color: 'white', fontSize: '2rem' }}>Loading...</div>
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard jobs={jobs} />} />
              <Route path="portfolio" element={<Portfolio jobs={jobs} />} />
              <Route
                path="portfolio/:pId"
                element={<PortfolioPage jobs={jobs} />}
              />
            </Routes>
          </Suspense>
        </Main>
      </Container>
      <Navigation showNav={showNav}>
        <IconContainer>
          <li>
            <Link to="/">
              {location.pathname === '/' ? (
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
