import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../app/store";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export type UserType = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  password2?: string
}

const Register = () => {

  const [formData, setFormData] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  })

  const { firstName, lastName, email, password, password2 } = formData

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isError, isLoading, isSuccess, message, user } = useSelector((state: RootState) => state.auth)

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
    setFormData((formData) => {
      return { ...formData, [e.target.name]: e.target.value }
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control"
              id="firstName"
              value={firstName}
              name="firstName"
              onChange={onChange}
              placeholder="Enter your first name" />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="lasttName"
              value={lastName}
              name="lastName"
              onChange={onChange}
              placeholder="Enter your last name" />
          </div>
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
            <input
              type="password"
              required
              className="form-control"
              id="password2"
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="Confirm your password" />
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

export default Register
