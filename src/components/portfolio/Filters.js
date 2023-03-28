import { useEffect, React } from 'react';
import {
  FiltersContainer,
  GridContainer,
  FilterContainer,
} from '../styles/PortfolioStyle';
import Checkbox from '../UI/Checkbox';
const Filters = ({
  jobs,
  checkList,
  setCheckList,
  setFilteredJobs,
  filteredObj,
}) => {
  const { type, form, category, platform } = filteredObj;
  function getObjKey(obj, value) {
    return Object.keys(obj).find((key) => obj[key].includes(value));
  }
  const changeEachHandler = (e, id) => {
    if (e.target.checked) {
      if (checkList.length === 0) {
        setCheckList([...checkList, id]);
      }
      if (checkList.length > 0) {
        if (
          checkList.find(
            (ele) => getObjKey(filteredObj, ele) === getObjKey(filteredObj, id)
          )
        ) {
          const sameKeyIndex = checkList.findIndex(
            (ele) => getObjKey(filteredObj, ele) === getObjKey(filteredObj, id)
          );
          const updatedCheckList = checkList.splice(sameKeyIndex, 1);
          setCheckList([...updatedCheckList, id]);
        }
        setCheckList([...checkList, id]);
      }
    } else {
      if (checkList.length > 0) {
        const updatedCheckList = checkList.filter(
          (checkedId) => checkedId !== id
        );
        setCheckList(updatedCheckList);
      }
    }
  };
  useEffect(() => {
    let arr = [];
    if (checkList.length > 0) {
      for (let ele of checkList) {
        arr.push(
          jobs.filter(
            (job) => job.fields[getObjKey(filteredObj, ele)][0] === ele
          )
        );
      }
      const result = arr.reduce((a, b) => a.filter((c) => b.includes(c)));
      setFilteredJobs(result);
    }
  }, [checkList]);
  return (
    <FiltersContainer>
      <GridContainer>
        <FilterContainer>
          <h3>JOB TYPE</h3>
          {type.map((jobType) => (
            <Checkbox
              key={jobType}
              checked={checkList.includes(jobType)}
              onChange={(e) => changeEachHandler(e, jobType)}
              text={jobType}
              name="type"
              id={jobType}
            />
          ))}
        </FilterContainer>
        <FilterContainer>
          <h3>WORK FORM</h3>
          {form.map((workForm) => (
            <Checkbox
              key={workForm}
              checked={checkList.includes(workForm)}
              onChange={(e) => changeEachHandler(e, workForm)}
              text={workForm}
              name="form"
              id={workForm}
            />
          ))}
        </FilterContainer>
        <FilterContainer>
          <h3>WORK TYPE</h3>
          {category.map((workType) => (
            <Checkbox
              key={workType}
              checked={checkList.includes(workType)}
              onChange={(e) => changeEachHandler(e, workType)}
              text={workType}
              name="category"
              id={workType}
            />
          ))}
        </FilterContainer>
        <FilterContainer>
          <h3>PLATFORM</h3>
          {platform.map((platform) => (
            <Checkbox
              key={platform}
              checked={checkList.includes(platform)}
              onChange={(e) => changeEachHandler(e, platform)}
              text={platform}
              name="platform"
              id={platform}
            />
          ))}
        </FilterContainer>
      </GridContainer>
    </FiltersContainer>
  );
};
export default Filters;
