import { useEffect, React } from 'react';
import {
  FiltersContainer,
  FlexContainer,
  FilterContainer,
} from '../styles/PortfolioStyle';
import Checkbox from '../UI/Checkbox';
const Filters = ({
  jobs,
  CheckList,
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
      if (CheckList.length === 0) {
        setCheckList([...CheckList, id]);
      }
      if (CheckList.length > 0) {
        if (
          CheckList.find(
            (ele) => getObjKey(filteredObj, ele) === getObjKey(filteredObj, id)
          )
        ) {
          const sameKeyIndex = CheckList.findIndex(
            (ele) => getObjKey(filteredObj, ele) === getObjKey(filteredObj, id)
          );
          const updatedCheckList = CheckList.splice(sameKeyIndex, 1);
          setCheckList([...updatedCheckList, id]);
        }
        setCheckList([...CheckList, id]);
      }
    } else {
      if (CheckList.length > 0) {
        const updatedCheckList = CheckList.filter(
          (checkedId) => checkedId !== id
        );
        setCheckList(updatedCheckList);
      }
    }
  };
  useEffect(() => {
    let arr = [];
    if (CheckList.length > 0) {
      for (let ele of CheckList) {
        arr.push(
          jobs.filter(
            (job) => job.fields[getObjKey(filteredObj, ele)][0] === ele
          )
        );
      }
      const result = arr.reduce((a, b) => a.filter((c) => b.includes(c)));
      setFilteredJobs(result);
    }
  }, [CheckList]);
  return (
    <FiltersContainer>
      <FlexContainer>
        <FilterContainer>
          <h3>JOB TYPE</h3>
          {type.map((jobType) => (
            <Checkbox
              key={jobType}
              checked={CheckList.includes(jobType)}
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
              checked={CheckList.includes(workForm)}
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
              checked={CheckList.includes(workType)}
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
              checked={CheckList.includes(platform)}
              onChange={(e) => changeEachHandler(e, platform)}
              text={platform}
              name="platform"
              id={platform}
            />
          ))}
        </FilterContainer>
      </FlexContainer>
    </FiltersContainer>
  );
};
export default Filters;
