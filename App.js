import { StyleSheet } from 'react-native';
import { UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import * as Sentry from 'sentry-expo';
import * as Amplitude from '@amplitude/analytics-react-native';
import DetailsScreen from './DetailsScreen';
import ProfileScreen from './ProfileScreen';
import TaskListScreen from './tasklistscreen';
import AddTaskScreen from './AddTaskScreen';
// import MediaScreen from './MediaScreen';
// import MapScreen from './MapScreen';
// import SensorScreen from './SensorScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="TaskList" component={TaskListScreen} />
         <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});