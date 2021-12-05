import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";

const UserLogin: React.FC = (props) => {
  const onViewChange = (view: number) => {
    setView(view);
  };

  const [view, setView] = useState(0);

  return (
    <div>
      {view === 0 && <Login onViewChange={onViewChange}></Login>}

      {view === 1 && <Signup onViewChange={onViewChange}></Signup>}

      {view === 2 && (
        <ForgotPassword onViewChange={onViewChange}></ForgotPassword>
      )}
    </div>
  );
};

export default UserLogin;
