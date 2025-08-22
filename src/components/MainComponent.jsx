import "./css/MainComponent.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const MainComponent = () => {
  const [input, setInput] = useState({ inputU: "", inputUN: "", inputP: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  function HandleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function HandleBtn() {
    if (
      input.inputU.trim() === "" ||
      input.inputUN.trim() === "" ||
      input.inputP.trim() === ""
    ) {
      toast.error("Enter All The Details First", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setPasswordArray([...passwordArray, { input, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { input, id: uuidv4() }])
      );
      console.log([...passwordArray, input]);
      setInput({ inputU: "", inputUN: "", inputP: "" });

      //Toast after the password is added
      toast.success("Password added succesfully", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const handleSubmit = (e) => {
    if (e.key === "Enter") HandleBtn();
  };

  const deletePassword = (id) => {
    let newPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(newPasswords);
    localStorage.setItem(
      "passwords",
      JSON.stringify(newPasswords)
    );
    toast.success("Password deleted succesfully", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container">
        <div className="first-part">
          <div className="start">
            <h1>Your Own Password Manager</h1>
            <h3>
              Bored of Forgetting passwords? Store your passwords with
              P-Manager.
            </h3>
          </div>
          <div className="input-fields">
            <input
              type="text"
              placeholder="Website Name"
              onKeyDown={handleSubmit}
              onChange={HandleChange}
              value={input.inputU}
              name="inputU"
              required={true}
            />
            <div className="main-input">
              <input
                type="text"
                placeholder="Username"
                onKeyDown={handleSubmit}
                onChange={HandleChange}
                value={input.inputUN}
                name="inputUN"
                required={true}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={HandleChange}
                onKeyDown={handleSubmit}
                value={input.inputP}
                name="inputP"
                required={true}
              />
            </div>
            <button onClick={HandleBtn}>Add Details</button>
          </div>
        </div>
        <div className="second-part">
          <h2>Your Passwords</h2>
          <div className="content">
            {passwordArray.length === 0 && (
              <div style={{ textAlign: "center" }}>No Passwords to Show</div>
            )}
            {passwordArray.length !== 0 && (
              <ul>
                {passwordArray.map((item) => {
                  return (
                    <li key={item.id}>
                      <div className="contents">
                        <div className="weburl">
                          <p>{item.input.inputU}</p>
                        </div>
                        <div className="username">
                          <p>{item.input.inputUN}</p>
                        </div>
                        <div className="password">
                          <p>{item.input.inputP}</p>
                        </div>
                        <div className="control-btns">
                          <button
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
