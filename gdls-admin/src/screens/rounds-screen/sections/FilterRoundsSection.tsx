import React from 'react';
import { Formik } from 'formik';
import { gql } from 'apollo-boost';
import { css } from 'emotion';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react';

import { SelectInput } from '../../../components/form/SelectInput';

import { adjustWeeksForDropdown } from '../utils/adjust-weeks-for-dropdown';
import { weekStore } from '../stores/week-store';

const containerStyle = css`
  width: 200px;
  margin-bottom: 20px;
`;

const WEEKS_QUERY = gql`
  query WEEKS {
    weeks {
      id
      weekNumber
      isActive
      year {
        id
        year
      }
    }
  }
`;

export const FilterRoundsSection = observer(() => {
  const { data, loading } = useQuery(WEEKS_QUERY);
  if (loading) {
    return <CircularProgress />
  }
  const weekOptions = adjustWeeksForDropdown(data.weeks);
  return (
    <div className={containerStyle}>
      <Formik
        initialValues={{}}
        onSubmit={() => {}}
      >
        <SelectInput
          label="Select Week"
          name="week"
          options={weekOptions}
          onChange={value => weekStore.weekId = value}
          value={weekStore.weekId}
        />
      </Formik>
    </div>
  );
});
