import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export type UserLoginType = {
  email: string;
  password: string;
}

const Login = () => {

  const [formData, setFormData] = useState<UserLoginType>({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {isError, message, isSuccess, user, isLoading} = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess && user) {
      navigate('/')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, message, navigate, user])


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const loginData: UserLoginType = {
      email,
      password
    }
    dispatch(login(loginData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login in to your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              required
              className="form-control"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <input
              type="password"
              required
              className="form-control"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
