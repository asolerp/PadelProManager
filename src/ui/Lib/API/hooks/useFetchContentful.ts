import {useEffect, useState} from 'react';

export const fetchContentful = async query => {
  try {
    return await fetch(
      'https://graphql.contentful.com/content/v1/spaces/m9b926lzyqpz/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authenticate the request
          Authorization: 'Bearer 3ewIsD7LUSm6bQ3eUjlGIAQbRik-MW0vwCHBBQqjacA',
        },
        // send the GraphQL query
        body: JSON.stringify({query}),
      },
    )
      .then(response => response.json())
      .then(({data, errors}) => {
        if (errors) {
          console.error(errors);
        }
        return data;
      });
  } catch (err) {
    console.log(err);
  }
};

export const useFetchContentFul = ({query}) => {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    const refreshData = await fetchContentful(query);
    setData(refreshData);
    setRefreshing(false);
  };

  useEffect(() => {
    const handleFetchContentful = async () => {
      try {
        setLoading(true);
        const response = await fetchContentful(query);
        setData(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(true);
      }
    };

    handleFetchContentful();
  }, [query]);

  return {
    refreshing,
    onRefresh,
    loading,
    data,
  };
};
