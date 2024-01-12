import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const auth = useSelector((state) => state.persistedReducer.auth.value);
  const { isAuth } = auth;

  useEffect(() => {
    // Check if the user is authenticated here
    const isAuthenticated = isAuth === true ? true : false;

    if (!isAuthenticated) {
      router.push("/login"); // Redirect to the login page if not authenticated
    }
  }, []);

  return children;
}

export default ProtectedRoute;
