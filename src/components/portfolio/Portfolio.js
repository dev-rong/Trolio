import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import FilterIcon from '../../Icons/FilterIcon';
import SearchIcon from '../../Icons/SearchIcon';
import { CloseBtn, Container, SearchContainer } from '../styles/PortfolioStyle';
import useBoolean from '../hooks/useBoolean';
import PortfolioThumbnail from './PortfolioThumbnail';
const Filters = lazy(() => import('./Filters'));
const NoResultsFoundPage = lazy(() => import('./NoResultsFoundPage'));
const Portfolio = ({ jobs }) => {
  //검색어 상태
  const [searchKeyword, setSearchKeyword] = useState('');
  //필터 유무
  const [showFilters, { setToggle: toggleFiltersHandler }] = useBoolean(false);
  const filteredObj = {
    type: [...new Set(jobs.map((job) => job.fields['type'][0]))],
    form: [...new Set(jobs.map((job) => job.fields['form'][0]))],
    category: [...new Set(jobs.map((job) => job.fields['category'][0]))],
    platform: [...new Set(jobs.map((job) => job.fields['platform'][0]))],
  };
  const [jobLength, setJobLength] = useState(0);
  const [checkList, setCheckList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const inputRef = useRef(null);
  //검색어 입력 핸들러
  const searchInputChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  };
  // 검색어 초기화 핸들러
  const initializeSearchInputHandler = () => {
    setSearchKeyword('');
    inputRef.current.focus();
  };
  //검색어 일치
  const keywordMatchedJobs = jobs.filter((job) =>
    job.fields['title']
      .toLowerCase()
      .trim()
      .includes(searchKeyword.toLowerCase().trim())
  );
  //필터링,검색어 일치
  const filteredKeywordMatchedJobs = filteredJobs.filter((job) =>
    job.fields['title']
      .toLowerCase()
      .trim()
      .includes(searchKeyword.toLowerCase().trim())
  );
  //검색어 키워드 x
  const noSearchKeyword = searchKeyword.trim().length === 0;
  //검색어 키워드 o
  const moreThanOneKeyword = searchKeyword.trim().length > 0;

  useEffect(() => {
    const showSearchResults = () => {
      let jl = '';
      if (jobs.length > 0 && noSearchKeyword && checkList.length === 0) {
        jl = jobs.length;
      } else if (
        jobs.length > 0 &&
        noSearchKeyword &&
        filteredJobs.length > 0
      ) {
        jl = filteredJobs.length;
      } else if (
        jobs.length > 0 &&
        moreThanOneKeyword &&
        checkList.length === 0 &&
        keywordMatchedJobs.length > 0
      ) {
        jl = keywordMatchedJobs.length;
      } else if (
        jobs.length > 0 &&
        moreThanOneKeyword &&
        checkList.length > 0 &&
        filteredKeywordMatchedJobs.length > 0
      ) {
        jl = filteredKeywordMatchedJobs.length;
      } else {
        jl = 0;
      }
      setJobLength(jl);
    };
    showSearchResults();
  }, [
    jobs,
    noSearchKeyword,
    moreThanOneKeyword,
    checkList,
    filteredJobs,
    keywordMatchedJobs,
    filteredKeywordMatchedJobs,
  ]);

  return (
    <>
      {/* 검색창+필터 토글 버튼 */}
      <SearchContainer>
        {/* 검색창 */}
        <div style={{ position: 'relative', width: '90%' }}>
          {/* 돋보기 아이콘 */}
          <div style={{ position: 'absolute', left: '10px', top: '3px' }}>
            <SearchIcon size={32} color={'#A0A0A0'} />
          </div>
          {/* 검색창 INPUT */}
          <input
            ref={inputRef}
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '8px',
              paddingLeft: '3rem',
            }}
            id="searchInput"
            type="text"
            value={searchKeyword}
            onChange={searchInputChangeHandler}
          />
          {searchKeyword.length !== 0 ? (
            <div
              onClick={initializeSearchInputHandler}
              style={{ position: 'absolute', right: '10px', top: '7px' }}
            >
              <CloseBtn />
            </div>
          ) : null}
          <p
            style={{
              position: 'absolute',
              color: '#FFFFFF',
              left: '0.5rem',
              top: '3rem',
              fontSize: '0.875rem',
            }}
          >
            {jobLength} results
          </p>
        </div>
        {/* 검색창 라벨 */}
        <label
          htmlFor="searchInput"
          style={{ marginTop: '2rem', color: '#FFFFFF' }}
        >
          Search by title
        </label>
        {/* 필터 토글 버튼 */}
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={toggleFiltersHandler}
            aria-label={showFilters ? 'close filter' : 'open filter'}
          >
            <FilterIcon size={16} />
            {showFilters ? 'Close Filter' : 'Open Filter'}
          </button>
        </div>
      </SearchContainer>
      {/* 필터 컴포넌트 */}
      {showFilters ? (
        <Suspense>
          <Filters
            jobs={jobs}
            filteredObj={filteredObj}
            checkList={checkList}
            setCheckList={setCheckList}
            filteredJobs={filteredJobs}
            setFilteredJobs={setFilteredJobs}
          />
        </Suspense>
      ) : null}
      <Container>
        {/* jobs x */}
        {jobs.length === 0 ? (
          //jobs x
          <Suspense>
            <NoResultsFoundPage />
          </Suspense>
        ) : //jobs o
        null}
        {/* jobs o 검색어 x  */}
        {jobs.length > 0 &&
          noSearchKeyword &&
          (checkList.length === 0 ? (
            //필터 x
            //전체 데이터
            PortfolioThumbnail(jobs)
          ) : //필터 o
          filteredJobs.length > 0 ? (
            //필터 일치 o
            PortfolioThumbnail(filteredJobs)
          ) : (
            //필터 일치 x
            <Suspense>
              <NoResultsFoundPage />
            </Suspense>
          ))}
        {/* jobs o 검색어 o */}
        {jobs.length > 0 &&
          moreThanOneKeyword &&
          (checkList.length === 0 ? (
            //필터 x
            keywordMatchedJobs.length > 0 ? (
              //검색어 일치 o
              PortfolioThumbnail(keywordMatchedJobs)
            ) : (
              //검색어 일치 x
              <Suspense>
                <NoResultsFoundPage />
              </Suspense>
            )
          ) : //필터 o
          filteredKeywordMatchedJobs.length > 0 ? (
            // 검색어 일치 o
            PortfolioThumbnail(filteredKeywordMatchedJobs)
          ) : (
            // 검색어 일치 x
            <Suspense>
              <NoResultsFoundPage />
            </Suspense>
          ))}
      </Container>
    </>
  );
};
export default Portfolio;
