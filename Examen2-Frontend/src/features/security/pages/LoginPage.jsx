import { useFormik } from "formik";
import { FaArrowRight } from "react-icons/fa";
import { loginInitValues, loginValidationSchema } from "../forms";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { Loading } from "../../../shared/components/Loading";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const message = useAuthStore((state) => state.message);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: loginInitValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      // console.log(formValues);
      setLoading(true);
      await login(formValues);
      setLoading(false);
    },
  });

  if(loading) {
    return <Loading />;
  }

  return (
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 className="font-bold text-center text-2xl mb-5 text-blue-600">
        Iniciar Sesión
      </h1>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        {error ? (
          <span className="p-4 block bg-red-500 text-white text-center rounded-t-lg">
            {message}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="bg-white shadow-lg text-sm rounded-lg divide-y divide-gray-200">
        <form onSubmit={formik.handleSubmit} className="px-5 py-7">
          {/* Campo Correo Electrónico */}
          <div className="mb-4">
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Campo Contraseña */}
          <div className="mb-4">
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Botón Ingresar */}
          <button
            type="submit"
            className="transition duration-200 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:shadow-sm focus:ring-4 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="inline-block mr-2">Ingresar</span>
            <FaArrowRight className="w-4 h-4 inline-block" />
          </button>
        </form>
      </div>
    </div>
  );
};