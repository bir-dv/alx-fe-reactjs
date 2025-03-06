import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

const App = () => {
  return(
    <div>
      <RegistrationForm />
      <br />

      <h3>controll the form using formik</h3>
      <FormikForm />
    </div>
  )
}

export default App;