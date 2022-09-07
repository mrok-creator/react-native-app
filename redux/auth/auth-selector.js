export const isUserLogin = ({ auth }) => auth.isLogin;
export const userId = ({ auth }) => auth.userData.uid;
export const displayName = ({ auth }) => auth.userData.displayName;
export const avatar = ({ auth }) => auth.userData.photoURL;
