import { StyleSheet, View } from 'react-native'; 
import Counter from './components/Counter';
  
export default function App_Praktikum_C() { 
  return ( 
    <View style={styles.container}> 
      <Counter />
    </View> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }, 
});
