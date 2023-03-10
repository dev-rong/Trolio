import React from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import classes from '../styles/PortfolioPage.module.css';
import ArrowGoBackIcon from '../../Icons/ArrowGoBackIcon';
const PortfolioPage = ({ jobs }) => {
  let navigate = useNavigate();
  const { pId } = useParams();
  //페이지 이동 버튼 핸들러
  const goHandler = (e, index) => {
    e.preventDefault();
    switch (e.target.parentElement['id']) {
      case 'backward':
        {
          navigate(`/portfolio/${index - 1}`);
        }
        break;
      case 'forward':
        navigate(`/portfolio/${index + 1}`);
        break;
    }
  };
  return jobs.map((job, index) =>
    Number(pId) === index ? (
      <>
        {/* 포트폴리오 상세페이지 래퍼 */}
        <div className={classes['description-wrapper']} key={job.id}>
          <div className={classes['description-container']}>
            {/* 작품 포스터 이미지 */}
            <div className={classes['description-img-wrapper']}>
              <img
                className={classes['description-img']}
                src={job.fields['poster'][0]['url']}
                alt="work poster"
              />
            </div>
            {/* 페이지 이동 버튼 */}
            <div className={classes.description}>
              <Link to={`/portfolio`}>
                <div style={{ display: 'inline-flex' }}>
                  <ArrowGoBackIcon />
                  <span style={{ color: 'white', marginLeft: '1rem' }}>
                    BACK
                  </span>
                </div>
              </Link>
              <div className={classes['description-btn-wrapper']}>
                {index !== 0 ? (
                  <button
                    className={classes['description-btn']}
                    id="backward"
                    onClick={(e) => goHandler(e, index)}
                  >
                    <div
                      className={`${classes.bracket} ${classes['bracket-left']}`}
                    ></div>
                  </button>
                ) : (
                  false
                )}
                <span>{`${Number(pId) + 1} / ${jobs.length}`}</span>
                {index !== jobs.length - 1 ? (
                  <button
                    className={classes['description-btn']}
                    id="forward"
                    onClick={(e) => goHandler(e, index)}
                  >
                    <div
                      className={`${classes.bracket} ${classes['bracket-right']}`}
                    ></div>
                  </button>
                ) : (
                  false
                )}
              </div>
              {/* 항목 */}
              <div>
                <h2>Title</h2>
                <p>{job.fields['title']}</p>
              </div>
              <div>
                <h2>Platform</h2>
                <p>{job.fields['platform']}</p>
              </div>
              <div>
                <h2>Year</h2>
                <p>{job.fields['deadline'].slice(0, 4)}</p>
              </div>
              <div>
                <h2>Type</h2>
                <p>{job.fields['type'][0]}</p>
              </div>
              <div>
                <h2>Form</h2>
                <p>{job.fields['form'][0]}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      false
    )
  );
};
export default PortfolioPage;
