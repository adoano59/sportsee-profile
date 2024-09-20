
import React, { useEffect, useState } from 'react';
import { getProfil } from '../services/api';
const DataFetcher = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfil(props.userid);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className='userContent'>
        <h1>Bonjour</h1>
        <h1 className='userName'>{data.data.userInfos.firstName}</h1>
      </div>
      <div>Félicitation ! Vous avez explosé vos objectifs hier 👏</div>
    </div>
  );
};

export default DataFetcher;
