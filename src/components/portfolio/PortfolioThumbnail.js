import { Link } from 'react-router-dom';
import { Image } from '../styles/PortfolioStyle';

const PortfolioThumbnail = (ele) => {
  return ele.map((job, index) => (
    <Link key={job.id} to={`/portfolio/${index}`}>
      <Image
        className="bgImage"
        key={job.id}
        src={job.fields['converted'][0]['url']}
        title={
          job.fields['title'].substring(0, job.fields['title'].indexOf('('))
            ? job.fields['title'].substring(0, job.fields['title'].indexOf('('))
            : job.fields['title']
        }
        workForm={job.fields['form'][0]}
        jobType={job.fields['type'][0]}
      />
    </Link>
  ));
};
export default PortfolioThumbnail;
