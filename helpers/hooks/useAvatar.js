import { useSelector, shallowEqual } from "react-redux";

import { avatar } from "../../redux/auth/auth-selector";

const useAvatar = () => {
  const uri = useSelector(avatar, shallowEqual);

  return uri;
};

export default useAvatar;
