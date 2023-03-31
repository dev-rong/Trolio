import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import classes from '../styles/PortfolioPage.module.css';
import ArrowGoBackIcon from '../../Icons/ArrowGoBackIcon';
const PortfolioPage = ({ jobs }) => {
  let navigate = useNavigate();
  const { pId } = useParams();
  const jobsId = jobs.map((job) => job.id);
  useEffect(() => {
    {
      if (!jobsId.includes(pId)) {
        navigate('/notfound', { replace: true });
      }
    }
  }, [pId]);
  //페이지 이동 버튼 핸들러
  const goHandler = (e, id) => {
    e.preventDefault();
    switch (e.target.parentElement['id']) {
      case 'backward':
        {
          navigate(`/portfolio/${jobsId[jobsId.indexOf(id) - 1]}`);
        }
        break;
      case 'forward':
        navigate(`/portfolio/${jobsId[jobsId.indexOf(id) + 1]}`);
        break;
    }
  };
  return jobs.map((job, index) =>
    pId === job.id ? (
      <div key={job.id}>
        {/* 포트폴리오 상세페이지 래퍼 */}
        <div className={classes['description-wrapper']}>
          <div className={classes['description-container']}>
            {/* 작품 포스터 이미지 */}
            <div className={classes['description-img-wrapper']}>
              <img
                className={classes['description-img']}
                src={job.fields['converted'][0]['url']}
                alt="work poster"
              />
            </div>
            {/* 페이지 이동 버튼 */}
            <div className={classes.description}>
              <Link to={`/portfolio`}>
                <div style={{ display: 'inline-flex' }}>
                  <ArrowGoBackIcon size={24} fill={'#FFFFFF'} />
                  <span style={{ color: '#FFFFFF', marginLeft: '1rem' }}>
                    BACK
                  </span>
                </div>
              </Link>
              <div className={classes['description-btn-wrapper']}>
                {index !== 0 ? (
                  <button
                    aria-label={'go backward'}
                    className={classes['description-btn']}
                    id="backward"
                    onClick={(e) => goHandler(e, job.id)}
                  >
                    <div
                      className={`${classes.bracket} ${classes['bracket-left']}`}
                    ></div>
                  </button>
                ) : (
                  false
                )}
                <span>{`${jobsId.indexOf(pId) + 1} / ${jobs.length}`}</span>
                {index !== jobs.length - 1 ? (
                  <button
                    aria-label={'go forward'}
                    className={classes['description-btn']}
                    id="forward"
                    onClick={(e) => goHandler(e, job.id)}
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
      </div>
    ) : (
      false
    )
  );
};
export default PortfolioPage;
