import TextField from "@mui/material/TextField";

export default function Login(props) {
  const handleChange = (e) => {
    if (e.target.name === "email") {
      props.setLoginEmail(e.target.value);
    } else if (e.target.name === "password") {
      props.setLoginPassword(e.target.value);
    }
  };
  return (
    <>
      <div className="login">
        <div className="login__left-side">
          <div className="login__logo"></div>
        </div>
        <div className="login__right-side">
          <form className="login__form">
            <div className="login__title">Log In</div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required={true}
              fullWidth={true}
              sx={{
                marginTop: "30px",
              }}
              name="email"
              onChange={handleChange}
              error={props.error && props.errorType === "email"}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required={true}
              fullWidth={true}
              sx={{
                marginTop: "30px",
              }}
              name="password"
              type={"password"}
              onChange={handleChange}
              error={props.error && props.errorType === "password"}
            />
            <div className="error__mesage">
              {props.errorType === "email"
                ? "Email is not valid!"
                : props.errorType === "password"
                ? "Password myst have at least 8 characters!"
                : props.errorType === "unauthorized"
                ? "Invalid credentials!"
                : null}
            </div>
            <div className="login__submit">
              <input
                className="button"
                onClick={props.handleSubmit}
                value={"Log In"}
                type="button"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
