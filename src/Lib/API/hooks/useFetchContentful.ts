import {useEffect, useState} from 'react';

export const useFetchContentFul = ({query}) => {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchContentful = async () => {
      try {
        setLoading(true);
        await fetch(
          'https://graphql.contentful.com/content/v1/spaces/m9b926lzyqpz/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Authenticate the request
              Authorization:
                'Bearer 3ewIsD7LUSm6bQ3eUjlGIAQbRik-MW0vwCHBBQqjacA',
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
            setData(data);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContentful();
  }, [query]);

  return {
    loading,
    data,
  };
};
