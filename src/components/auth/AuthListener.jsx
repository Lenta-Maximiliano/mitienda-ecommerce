import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebaseConfig"; // ajustá ruta
import { setUser, logout } from "../../features/auth/authSlice";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const userData = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || "",
        };
        dispatch(setUser(userData));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}