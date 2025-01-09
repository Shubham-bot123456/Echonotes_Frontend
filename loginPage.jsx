import React, { useState } from "react";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      {/* ...existing code... */}
      <div>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          // ...existing code...
        />
        <button onClick={togglePasswordVisibility}>
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>
      {/* ...existing code... */}
    </div>
  );
};

export default LoginPage;
