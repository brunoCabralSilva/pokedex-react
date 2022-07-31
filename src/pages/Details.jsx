import React, { useEffect } from 'react';

export default function Details(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    
  }, []);

  return(
    <div>
        {id}
    </div>
  );
};