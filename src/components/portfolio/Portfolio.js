import React, { useState, useRef } from 'react';
import Filters from './Filters';
import FilterIcon from '../../Icons/FilterIcon';
import SearchIcon from '../../Icons/SearchIcon';
import { CloseBtn, Container, SearchContainer } from '../styles/PortfolioStyle';
import useBoolean from '../hooks/useBoolean';
import PortfolioThumbnail from './PortfolioThumbnail';
import NoResultsFoundPage from './NoResultsFoundPage';
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
  const [CheckList, setCheckList] = useState([]);
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
  //검색어 키워드 일치
  const keywordMatchedJobs = jobs.filter((job) =>
    job.fields['title']
      .toLowerCase()
      .trim()
      .includes(searchKeyword.toLowerCase().trim())
  );
  //필터링,검색어
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
  return (
    <>
      {/* 검색창+필터 토글 버튼 */}
      <SearchContainer>
        {/* 검색창 */}
        <div style={{ position: 'relative', width: '90%' }}>
          {/* 돋보기 아이콘 */}
          <div style={{ position: 'absolute', left: '10px', top: '3px' }}>
            <SearchIcon size={32} color={'#8c979a'} />
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
        </div>
        {/* 검색창 라벨 */}
        <label
          htmlFor="searchInput"
          style={{ marginTop: '1rem', color: '#EFEFEF' }}
        >
          Search by title
        </label>
        {/* 필터 토글 버튼 */}
        <div style={{ marginTop: '1rem' }}>
          <button onClick={toggleFiltersHandler}>
            <FilterIcon size={16} />
            {showFilters ? 'Close Filters' : 'Open Filters'}
          </button>
        </div>
      </SearchContainer>
      {/* 필터 컴포넌트 */}
      {showFilters ? (
        <Filters
          jobs={jobs}
          filteredObj={filteredObj}
          CheckList={CheckList}
          setCheckList={setCheckList}
          filteredJobs={filteredJobs}
          setFilteredJobs={setFilteredJobs}
        />
      ) : null}
      <Container>
        {/* jobs x */}
        {jobs.length === 0 ? (
          //jobs x
          <NoResultsFoundPage />
        ) : //jobs o
        null}
        {/* jobs o 검색어 x  */}
        {jobs.length > 0 &&
          noSearchKeyword &&
          (CheckList.length === 0 ? (
            //필터 x
            //전체 데이터
            PortfolioThumbnail(jobs)
          ) : //필터 o
          filteredJobs.length > 0 ? (
            //필터 일치 o
            PortfolioThumbnail(filteredJobs)
          ) : (
            //필터 일치 x
            <NoResultsFoundPage />
          ))}
        {/* jobs o 검색어 o */}
        {jobs.length > 0 &&
          moreThanOneKeyword &&
          (CheckList.length === 0 ? (
            //필터 x
            keywordMatchedJobs.length > 0 ? (
              //검색어 일치 o
              PortfolioThumbnail(keywordMatchedJobs)
            ) : (
              //검색어 일치 x
              <NoResultsFoundPage />
            )
          ) : //필터 o
          filteredKeywordMatchedJobs.length > 0 ? (
            // 검색어 일치 o
            PortfolioThumbnail(filteredKeywordMatchedJobs)
          ) : (
            // 검색어 일치 x
            <NoResultsFoundPage />
          ))}
      </Container>
    </>
  );
};
export default Portfolio;
