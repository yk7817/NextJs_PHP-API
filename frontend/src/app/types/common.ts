// Register Type
export type RegisterType = {
  name: string;
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};

// HeaderRegisterProps
export type HeaderRegisterProps = {
  onOpenRegister: () => void;
};

// HeaderLoginProps
export type HeaderLoginProps = {
  onOpenLogin: () => void;
};

// RegisterCloseProps
export type RegisterCloseProps = {
  onCloseRegister: () => void;
};

// LoginCloseProps
export type LoginCloseProps = {
  onCloseLogin: () => void;
};

// LoginAuthProps
export type LoginAuthProps = {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
};

// LoginUserProps
export type LoginUserType = {
  id: number;
  email: string;
  name: string;
};

// AuthContextProps
export type AuthContextProps = {
  authState: boolean;
  setAuthState: (state: boolean) => void;
  user: LoginUserType | null;
  setUser: React.Dispatch<React.SetStateAction<LoginUserType | null>>;
};

// PostType
export type Posttype = {
  user_name: string;
  post: string;
  created_at: number;
};
