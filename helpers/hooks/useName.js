import { useSelector, shallowEqual } from "react-redux";

import { displayName } from "../../redux/auth/auth-selector";

const useDisplayName = () => {
  const userName = useSelector(displayName, shallowEqual);

  return userName;
};

export default useDisplayName;
