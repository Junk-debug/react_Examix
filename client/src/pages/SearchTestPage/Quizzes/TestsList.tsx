import * as React from 'react';
import Grid from '@mui/material/Grid';
import TestCard from './TestCard';
import { Test } from '../../../types/api/entities/test';

interface TestsListProps {
  tests: Test[];
}

const TestsList: React.FC<TestsListProps> = ({ tests }) => {
  return (
    <Grid container spacing={2} sx={{ p: '16px' }}>
      {tests.map((test) => (
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={test.id}>
          <TestCard test={test} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TestsList;
