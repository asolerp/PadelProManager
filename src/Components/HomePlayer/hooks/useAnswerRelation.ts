import {relationsQuery} from '../../../Api/queries';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';

export const useAnswerRelation = () => {
  const {updateDocument} = useUpdateDocument(relationsQuery);

  const handleUpdatePetiton = (relationId, state) => {
    updateDocument(relationId, {status: state});
  };

  return {
    handleUpdatePetiton,
  };
};
