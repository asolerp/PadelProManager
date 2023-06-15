export const query = group => `{
    padelProManagerCollection(where: { group:"${group}" }) {
      items {
        id
        title
        duration
        description
        objective
        level
        image {
          url
        }
      }
    }
  }`;
