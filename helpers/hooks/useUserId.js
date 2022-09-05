import { useSelector, shallowEqual } from "react-redux";

import { userId } from "../../redux/auth/auth-selector";

const useUserId = () => {
  const uid = useSelector(userId, shallowEqual);

  return uid;
};

export default useUserId;
