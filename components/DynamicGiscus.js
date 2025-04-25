import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Dynamically import the Giscus component
// This will reduce the initial bundle size as Giscus
// will only be loaded when needed (on the post page)
const Giscus = React.lazy(() => import('@giscus/react'));

const DynamicGiscus = (props) => {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      }
    >
      <Giscus {...props} />
    </Suspense>
  );
};

export default DynamicGiscus;