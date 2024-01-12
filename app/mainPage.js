import Wrapper from "@components/helpers/wrapper";
import { Sidebar } from "@components/sidebar/sidebar";
import { useSelector } from "react-redux";

const MainPage = ({ children }) => {
    const auth = useSelector((state) => state.persistedReducer.auth.value);
    console.log('auth', auth);
    return (
        <Wrapper>
            {
                auth.isAuth &&
                <div className='sidebar'>
                    <Sidebar />
                </div>
            }
            <div className={`app-content ${auth.isAuth && "fullWidth"}`}>
                {children}
            </div>
        </Wrapper>
    )
}
export default MainPage;