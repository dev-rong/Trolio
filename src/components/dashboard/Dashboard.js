import { useState, useEffect, lazy, Suspense } from 'react';
import dayjs from 'dayjs';
import useBoolean from '../hooks/useBoolean';
import {
  Grid,
  GridImage,
  DateContainer,
  DateWrapper,
  DashboardContainer,
} from '../styles/DashboardStyle';

const JobTypeChart = lazy(() => import('./JobTypeChart'));
const CategoryChart = lazy(() => import('./CategoryChart'));
const WorkFormChart = lazy(() => import('./WorkFormChart'));
const FirstHalfIncome = lazy(() => import('./FirstHalfIncome'));
const SecondHalfIncome = lazy(() => import('./SecondHalfIncome'));
const TotalIncome = lazy(() => import('./TotalIncome'));
const TotalWorkingHours = lazy(() => import('./TotalWorkingHours'));
const TotalWorks = lazy(() => import('./TotalWorks'));
const TotalRunningTimes = lazy(() => import('./TotalRunningTimes'));

import ArrowDownIcon from '../../Icons/ArrowDownIcon';
import ArrowUpIcon from '../../Icons/ArrowUpIcon';

const Dashboard = ({ jobs }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const paddedCurrentMonth = String(currentMonth).padStart(2, '0');
  const paddedCurrentDay = String(today.getDate()).padStart(2, '0');

  const firstDay = `${currentYear}-${paddedCurrentMonth}-01`;
  const paddedToday = `${currentYear}-${paddedCurrentMonth}-${paddedCurrentDay}`;

  const [fromA, setFromA] = useState(firstDay);
  const [toA, setToA] = useState(paddedToday);
  const [fromB, setFromB] = useState('');
  const [toB, setToB] = useState('');

  const [showB, setShowB] = useState(false);
  const [showDateSelect, { setToggle: setShowDateSelect }] = useBoolean(false);

  const setShowBHandler = () => {
    setShowB(!showB);
    setFromB('');
    setToB('');
  };

  const convertToADate = (d) => {
    const [year, month, day] = d.split('-');
    return new Date(year, month - 1, day);
  };
  const [rangedJobs, setRangedJobs] = useState([]);
  const [rangedJobB, setRangedJobB] = useState([]);

  useEffect(() => {
    setRangedJobs(
      jobs.filter(
        (job) =>
          convertToADate(fromA) <=
            convertToADate(job.fields['deadline'].slice(0, 10)) &&
          convertToADate(job.fields['deadline'].slice(0, 10)) <=
            convertToADate(toA)
      )
    );
    setRangedJobB(
      jobs.filter(
        (job) =>
          convertToADate(fromB) <=
            convertToADate(job.fields['deadline'].slice(0, 10)) &&
          convertToADate(job.fields['deadline'].slice(0, 10)) <=
            convertToADate(toB)
      )
    );
  }, [jobs, fromA, toA, fromB, toB]);

  const datePickerChangeHandler = (e) => {
    switch (e.target.name) {
      case 'fromA': {
        setFromA(e.target.value);
        break;
      }
      case 'toA': {
        setToA(e.target.value);
        break;
      }
      case 'fromB': {
        setFromB(e.target.value);
        break;
      }
      case 'toB': {
        setToB(e.target.value);
        break;
      }
    }
  };

  const ACompareSelectChangeHandler = (e) => {
    let fromAValue = '';
    let toAValue = '';
    const today = dayjs(new Date());

    switch (e.target.value) {
      case 'select duration':
        break;
      case 'this month':
        fromAValue = firstDay;
        toAValue = paddedToday;
        break;
      case 'last month':
        fromAValue = today
          .subtract(1, 'month')
          .set('date', 1)
          .format('YYYY-MM-DD');
        toAValue = today
          .subtract(1, 'month')
          .endOf('month')
          .format('YYYY-MM-DD');
        break;
      case 'last 3 months':
        fromAValue = today
          .subtract(3, 'month')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toAValue = paddedToday;
        break;
      case 'last 6 months':
        fromAValue = today
          .subtract(6, 'month')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toAValue = paddedToday;
        break;
      case 'last 1 year':
        fromAValue = today
          .subtract(12, 'month')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toAValue = paddedToday;
        break;
    }
    setFromA(fromAValue);
    setToA(toAValue);
  };

  const ABCompareSelectChangeHandler = (e) => {
    let fromAValue = '';
    let toAValue = '';
    let fromBValue = '';
    let toBValue = '';
    const today = dayjs(new Date());

    switch (e.target.value) {
      case 'select duration':
        break;
      case 'last week-this week':
        fromAValue = today
          .subtract(2, 'week')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toAValue = today.subtract(1, 'week').format('YYYY-MM-DD');
        fromBValue = today
          .subtract(1, 'week')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toBValue = today.format('YYYY-MM-DD');
        break;
      case 'last month-this month':
        fromAValue = today
          .subtract(1, 'month')
          .set('date', 1)
          .format('YYYY-MM-DD');
        toAValue = today.subtract(1, 'month').format('YYYY-MM-DD');
        fromBValue = firstDay;
        toBValue = paddedToday;
        break;
      case 'past 3 months-latest 3 months':
        fromAValue = today
          .subtract(6, 'month')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toAValue = today.subtract(3, 'month').format('YYYY-MM-DD');
        fromBValue = today
          .subtract(3, 'month')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toBValue = today.format('YYYY-MM-DD');
        break;
      case 'past 6 months-latest 6 months':
        fromAValue = today
          .subtract(1, 'year')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toAValue = today.subtract(6, 'month').format('YYYY-MM-DD');
        fromBValue = today
          .subtract(6, 'month')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toBValue = today.format('YYYY-MM-DD');
        break;
      case 'past year-this year':
        fromAValue = today
          .subtract(2, 'year')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toAValue = today.subtract(1, 'year').format('YYYY-MM-DD');
        fromBValue = today
          .subtract(1, 'year')
          .add(1, 'day')
          .format('YYYY-MM-DD');
        toBValue = today.format('YYYY-MM-DD');
        break;
    }
    setFromA(fromAValue);
    setToA(toAValue);
    setFromB(fromBValue);
    setToB(toBValue);
  };

  return (
    <DashboardContainer>
      <DateContainer>
        <div>
          <h3>
            {currentYear}.
            <span style={{ fontSize: '2rem' }}>{paddedCurrentMonth}</span>.
            {paddedCurrentDay}
          </h3>
        </div>
        <DateWrapper>
          <div>
            <p>Select Date</p>
            <button
              onClick={setShowDateSelect}
              aria-label={
                showDateSelect ? 'close select date' : 'open select date'
              }
            >
              {showDateSelect ? (
                <ArrowUpIcon size={24} color="#101322" />
              ) : (
                <ArrowDownIcon size={24} color="#101322" />
              )}
            </button>
          </div>
          {showDateSelect ? (
            <>
              <div>
                <span>A</span>
                <span>from:</span>
                <input
                  type="date"
                  name="fromA"
                  value={fromA}
                  onChange={datePickerChangeHandler}
                />
                <span>to:</span>
                <input
                  type="date"
                  name="toA"
                  value={toA}
                  onChange={datePickerChangeHandler}
                />
              </div>

              {showB ? (
                <div>
                  <span>B</span>
                  <span>from:</span>
                  <input
                    type="date"
                    name="fromB"
                    value={fromB}
                    onChange={datePickerChangeHandler}
                  />
                  <span>to:</span>
                  <input
                    type="date"
                    name="toB"
                    value={toB}
                    onChange={datePickerChangeHandler}
                  />
                </div>
              ) : null}

              <div>
                {!showB ? (
                  <select
                    name="duration"
                    id="duration"
                    onChange={ACompareSelectChangeHandler}
                  >
                    <option value="select duration">select duration</option>
                    <option value="this month">this month</option>
                    <option value="last month">last month</option>
                    <option value="last 3 months">last 3 months</option>
                    <option value="last 6 months">last 6 months</option>
                    <option value="last 1 year">last 1 year</option>
                  </select>
                ) : null}
                {showB ? (
                  <select
                    name="compareDuration"
                    id="compareDuration"
                    onChange={ABCompareSelectChangeHandler}
                  >
                    <option value="select duration">select duration</option>
                    <option value="last week-this week">
                      last week-this week
                    </option>
                    <option value="last month-this month">
                      last month-this month
                    </option>
                    <option value="past 3 months-latest 3 months">
                      past 3 mos-latest 3 mos
                    </option>
                    <option value="past 6 months-latest 6 months">
                      past 6 mos-latest 6 mos
                    </option>
                    <option value="past year-this year">
                      past year-this year
                    </option>
                  </select>
                ) : null}
                <button
                  className={'compare-btn'}
                  aria-label={showB ? 'compare A' : 'compare A and B'}
                  onClick={setShowBHandler}
                >
                  {showB ? 'A' : 'A/B'}
                </button>
              </div>

              <p
                style={{
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}
              >
                Compare {showB ? 'A' : 'A/B'}
              </p>
            </>
          ) : null}
        </DateWrapper>
      </DateContainer>

      <Grid>
        <GridImage>
          {/* 작업 유형 차트   */}
          <Suspense>
            <JobTypeChart rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
          </Suspense>
        </GridImage>
        <GridImage>
          {/* 작품 카테고리 차트 */}
          <Suspense>
            <CategoryChart
              jobs={jobs}
              rangedJobs={rangedJobs}
              rangedJobB={rangedJobB}
            />
          </Suspense>
        </GridImage>
        <GridImage>
          {/* 작업물 형태 차트 */}
          <Suspense>
            <WorkFormChart rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
          </Suspense>
        </GridImage>
        <GridImage>
          {/* 해당 기간 총수입/작업 시간 */}
          <Suspense>
            <TotalIncome rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
          </Suspense>
          <Suspense>
            <TotalWorkingHours
              rangedJobs={rangedJobs}
              rangedJobB={rangedJobB}
            />
          </Suspense>
        </GridImage>
        <GridImage>
          {/* 해당 기간 총 작업물 수/작업물 러닝타임 */}
          <Suspense>
            <TotalWorks rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
          </Suspense>
          <Suspense>
            <TotalRunningTimes
              rangedJobs={rangedJobs}
              rangedJobB={rangedJobB}
            />
          </Suspense>
        </GridImage>
        <GridImage>
          {/* 작년/올해 상/하반기 연수입 */}
          <Suspense>
            <FirstHalfIncome jobs={jobs} />
          </Suspense>
          <Suspense>
            <SecondHalfIncome jobs={jobs} />
          </Suspense>
        </GridImage>
      </Grid>
    </DashboardContainer>
  );
};
export default Dashboard;
