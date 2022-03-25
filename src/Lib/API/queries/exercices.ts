export const query = group => `{
    padelProManagerCollection(where: { group:"${group}" }) {
      items {
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
