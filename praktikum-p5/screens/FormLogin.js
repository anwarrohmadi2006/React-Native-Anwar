import { useState } from 'react';   
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ActivityIndicator, Alert 
} from 'react-native'; 

const AKUN_DUMMY = [   
  { email: 'admin@test.com', password: 'Admin123' },   
  { email: 'user@test.com', password: 'User1234' },  
];

export default function FormLogin({ navigation }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateAll = () => {
    let err = {};
    if (!form.email) err.email = 'Email tidak boleh kosong';
    if (!form.password) err.password = 'Password tidak boleh kosong';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLogin = async () => {   
    if (!validateAll()) return;   
    setLoading(true);   
    // Simulasi delay 1.5 detik   
    await new Promise(resolve => setTimeout(resolve, 1500));   
    setLoading(false);   
    
    const akun = AKUN_DUMMY.find(   
      a => a.email === form.email && a.password === form.password  
    );   

    if (akun) {   
      // Berhasil login — navigasi ke halaman utama   
      navigation.replace('MainApp', { email: form.email });   
    } else {   
      setErrors({ submit: 'Email atau password salah' });   
    }  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Login</Text>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={form.email}
          onChangeText={(val) => updateForm('email', val)}
          placeholder="nama@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorTeks}>{errors.email}</Text>}
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}> 
          <TextInput   
            style={styles.inputDalamWrapper}   
            value={form.password}   
            onChangeText={(val) => updateForm('password', val)}   
            secureTextEntry={!showPassword}   
            placeholder='Password'   
          />   
          <TouchableOpacity   
            style={styles.ikonMata}   
            onPress={() => setShowPassword(!showPassword)}   
          >   
            <Text>{showPassword ? 'HIDE' : 'SHOW'}</Text>   
          </TouchableOpacity>  
        </View>
        {errors.password && <Text style={styles.errorTeks}>{errors.password}</Text>}
      </View>

      {errors.submit && <Text style={[styles.errorTeks, { marginBottom: 10, textAlign: 'center' }]}>{errors.submit}</Text>}

      <TouchableOpacity   
        style={[styles.tombol, isLoading && styles.tombolDisabled]}   
        onPress={handleLogin}   
        disabled={isLoading}  
      >   
        {isLoading   
          ? <ActivityIndicator color='#FFF' />   
          : <Text style={styles.tombolTeks}>Masuk</Text>   
        }  
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.tombol, { backgroundColor: '#CCC', marginTop: 10 }]} 
        onPress={() => navigation.navigate('Registrasi')}
      >
        <Text style={[styles.tombolTeks, { color: '#333' }]}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F5F5F5' },
  judul: { fontSize: 24, fontWeight: 'bold', color: '#1F4E79', marginBottom: 24, textAlign: 'center' },
  fieldWrapper: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8 },
  inputDalamWrapper: { flex: 1, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15 },
  inputError: { borderColor: '#D32F2F' },
  errorTeks: { color: '#D32F2F', fontSize: 12, marginTop: 4 },
  ikonMata: { padding: 10 },
  tombol: { backgroundColor: '#1F4E79', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 10 },
  tombolDisabled: { opacity: 0.7 },
  tombolTeks: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
