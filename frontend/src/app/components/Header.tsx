import { HeaderRegisterProps } from "../types/common";
import { HeaderLoginProps } from "../types/common";
import { RegisterCloseProps } from "../types/common";
import { LoginCloseProps } from "../types/common";
import { useAuth } from "./AuthContext";

const Header = ({
  onOpenRegister,
  onOpenLogin,
  onCloseRegister,
  onCloseLogin,
}: HeaderRegisterProps &
  HeaderLoginProps &
  RegisterCloseProps &
  LoginCloseProps) => {
  // auth
  const { authState, setAuthState, user, setUser } = useAuth();

  // logout Click
  const handleLogOutClick = async () => {
    await fetch("http://localhost:8000/api/logout.php", {
      method: "POST",
      credentials: "include",
    });
    setAuthState(false);
    setUser(null);
  };

  return (
    <header className="header bg-blue-500 max-w-7xl m-auto">
      <div className="header_inner p-5 flex justify-between items-center">
        <div className="header_title">
          <h1 className="text-slate-200 font-bold">Next.js | PHP</h1>
        </div>
        {authState ? (
          <div>
            <ul className="flex items-center gap-10 text-slate-200">
              <li>
                <p>{user?.name}さん、こんにちは！</p>
              </li>
              <li>
                <button
                  className="font-medium text-gray-400 bg-white rounded-md px-3 py-1"
                  onClick={handleLogOutClick}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className="flex items-center gap-10 text-slate-200">
              <li>
                <button
                  onClick={() => {
                    onOpenRegister();
                    onCloseLogin();
                  }}
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onOpenLogin();
                    onCloseRegister();
                  }}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
