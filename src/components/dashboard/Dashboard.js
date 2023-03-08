import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useBoolean from '../hooks/useBoolean';
import {
  Grid,
  GridImage,
  DateContainer,
  DateWrapper,
  DashboardContainer,
} from '../styles/DashboardStyle';

import JobTypeChart from './JobTypeChart';
import CategoryChart from './CategoryChart';
import WorkFormChart from './WorkFormChart';
import FirstHalfIncome from './FirstHalfIncome';
import SecondHalfIncome from './SecondHalfIncome';
import TotalIncome from './TotalIncome';
import TotalWorkingHours from './TotalWorkingHours';
import TotalWorks from './TotalWorks';
import TotalRunningTimes from './TotalRunningTimes';

import ArrowDownIcon from '../../Icons/ArrowDownIcon';
import ArrowUpIcon from '../../Icons/ArrowUpIcon';

const Dashboard = ({ jobs }) => {
  const today = new Date();
  let d = dayjs(today);
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
    switch (e.target.value) {
      case 'select duration':
        setFromA('');
        setToA('');
        break;
      case 'this month':
        setFromA(firstDay);
        setToA(paddedToday);
        break;
      case 'last month':
        d = d.subtract(1, 'month');
        d = d.set('date', 1);
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.subtract(1, 'month');
        d = d.set('date', d.endOf('month').get('date'));
        d = d.format('YYYY-MM-DD');
        setToA(d);
        break;
      case 'last 3 months':
        d = d.subtract(3, 'month');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.format('YYYY-MM-DD');
        setToA(d);
        break;
      case 'last 6 months':
        d = d.subtract(6, 'month');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.format('YYYY-MM-DD');
        setToA(d);
        break;
      case 'last 1 year':
        d = d.subtract(12, 'month');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.format('YYYY-MM-DD');
        setToA(d);
        break;
    }
  };

  const ABCompareSelectChangeHandler = (e) => {
    switch (e.target.value) {
      case 'select duration':
        setFromA('');
        setToA('');
        setFromB('');
        setToB('');
        break;
      case 'last week-this week':
        d = d.subtract(2, 'week');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.subtract(1, 'week');
        d = d.format('YYYY-MM-DD');
        setToA(d);
        d = dayjs();
        d = d.subtract(1, 'week');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromB(d);
        d = dayjs();
        d = d.format('YYYY-MM-DD');
        setToB(d);
        break;
      case 'last month-this month':
        d = d.set('date', 1);
        d = d.subtract(1, 'month');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.subtract(1, 'month');
        d = d.format('YYYY-MM-DD');
        setToA(d);
        setFromB(firstDay);
        setToB(paddedToday);
        break;
      case 'past 3 months-latest 3 months':
        d = d.subtract(6, 'month');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.subtract(3, 'month');
        d = d.format('YYYY-MM-DD');
        setToA(d);
        d = dayjs();
        d = d.subtract(3, 'month');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromB(d);
        d = dayjs();
        d = d.format('YYYY-MM-DD');
        setToB(d);
        break;
      case 'past 6 months-latest 6 months':
        d = d.subtract(1, 'year');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.subtract(6, 'month');
        d = d.format('YYYY-MM-DD');
        setToA(d);
        d = dayjs();
        d = d.subtract(6, 'month');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromB(d);
        d = dayjs();
        d = d.format('YYYY-MM-DD');
        setToB(d);
        break;
      case 'past year-this year':
        d = d.subtract(2, 'year');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromA(d);
        d = dayjs();
        d = d.subtract(1, 'year');
        d = d.format('YYYY-MM-DD');
        setToA(d);
        d = dayjs();
        d = d.subtract(1, 'year');
        d = d.add(1, 'day');
        d = d.format('YYYY-MM-DD');
        setFromB(d);
        d = dayjs();
        d = d.format('YYYY-MM-DD');
        setToB(d);
        break;
    }
  };

  return (
    <DashboardContainer>
      <DateContainer>
        <div>
          <h3>
            {currentYear}.
            <span style={{ fontSize: '2.3rem' }}>{paddedCurrentMonth}</span>.
            {paddedCurrentDay}
          </h3>
        </div>
        <DateWrapper>
          <div>
            <p>Select Date</p>
            <button onClick={setShowDateSelect}>
              {showDateSelect ? (
                <ArrowUpIcon size={24} color="#223216" />
              ) : (
                <ArrowDownIcon size={24} color="#223216" />
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
                <button className={'compare-btn'} onClick={setShowBHandler}>
                  {showB ? 'A' : 'A-B'}
                </button>
              </div>

              <p
                style={{
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}
              >
                Compare {showB ? 'A' : 'A-B'}
              </p>
            </>
          ) : null}
        </DateWrapper>
      </DateContainer>

      <Grid>
        <GridImage>
          {/* 작업 유형 차트   */}
          <JobTypeChart rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
        </GridImage>
        <GridImage>
          {/* 작품 카테고리 차트 */}
          <CategoryChart
            jobs={jobs}
            rangedJobs={rangedJobs}
            rangedJobB={rangedJobB}
          />
        </GridImage>
        <GridImage>
          {/* 작업물 형태 차트 */}
          <WorkFormChart rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
        </GridImage>
        <GridImage>
          {/* 해당 기간 총수입/작업 시간 */}
          <TotalIncome rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
          <TotalWorkingHours rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
        </GridImage>
        <GridImage>
          {/* 해당 기간 총 작업물 수/작업물 러닝타임 */}
          <TotalWorks rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
          <TotalRunningTimes rangedJobs={rangedJobs} rangedJobB={rangedJobB} />
        </GridImage>
        <GridImage>
          {/* 작년/올해 상/하반기 연수입 */}
          <FirstHalfIncome jobs={jobs} />
          <SecondHalfIncome jobs={jobs} />
        </GridImage>
      </Grid>
    </DashboardContainer>
  );
};
export default Dashboard;
