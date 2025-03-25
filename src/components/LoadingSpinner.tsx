import React, { CSSProperties } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const override: CSSProperties = {
  margin: '0 auto',
  position: 'fixed',
  top: '50%',
  left: '50%',
};

type Props = {
  loading: boolean;
};

export default function LoadingSpinner({ loading }: Props) {
  return (
    <div className="sweet-loading">
      <ScaleLoader
        color={'#ffcd44'}
        loading={loading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
