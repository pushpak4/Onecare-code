// Importing modules from react for this app.
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Importing all pages which used in app.
import Login from './Login';
import PatientHome from './components/PatientHome';
import AppointmentBooking from "./components/AppointmentBooking";
import SignupPage from "./components/SignupPage";
import SearchDoctor  from './components/SearchDoctor';
import MedicationReminder from './components/MedicationReminder';
import SymptomsTracker from './components/SymptomsTracker';
import LabTestBooking from './components/LabTestBooking';
import ForgotPassword  from './components/ForgotPassword';
import DoctorHome from './components/DoctorHome';
import DoctorLogin from './components/DoctorLogin';
import HealthResources from './components/HealthResources';
import MeditationSession from './components/MeditationSession';
import DietDisplay from './components/DietDisplay';
import PrescriptionUpload from './components/PrescriptionUpload';
import ChildVaccine from './components/ChildVaccine';
import ManageAppointments from './components/ManageAppointments';
import CalorieCount from'./components/CalorieCount';

//Creating stack navigator.
const Stack = createStackNavigator();

//Indicating main component.
export default function App() {
  return (
    //It is used for managing navigation state for whole app.
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="PatientHome" component={PatientHome} options={{ headerShown: false }}/>
          <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }}/>
          <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} options={{ headerShown: false }}/>
          <Stack.Screen name="SearchDoctor" component={SearchDoctor} options={{ headerShown: false }}/>
          <Stack.Screen name="MedicationReminder" component={MedicationReminder} options={{ headerShown: false }}/>
          <Stack.Screen name="LabTestBooking" component={LabTestBooking} options={{ headerShown: false }}/>
          <Stack.Screen name="HealthResources" component={HealthResources} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
          <Stack.Screen name="DoctorHome" component={DoctorHome} options={{ headerShown: false }}/>
          <Stack.Screen name="DoctorLogin" component={DoctorLogin} options={{ headerShown: false }}/>
          <Stack.Screen name="SymptomsTracker" component={SymptomsTracker} options={{ headerShown: false }}/>
          <Stack.Screen name="MeditationSession" component={MeditationSession} options={{ headerShown: false }}/>
          <Stack.Screen name="DietDisplay" component={DietDisplay} options={{ headerShown: false }}/>
          <Stack.Screen name="PrescriptionUpload" component={PrescriptionUpload} options={{ headerShown: false }}/>
          <Stack.Screen name="ChildVaccine" component={ChildVaccine} options={{ headerShown: false }}/>
          <Stack.Screen name="ManageAppointments" component={ManageAppointments} options={{ headerShown: false }}/>
          <Stack.Screen name="CalorieCount" component={CalorieCount} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
