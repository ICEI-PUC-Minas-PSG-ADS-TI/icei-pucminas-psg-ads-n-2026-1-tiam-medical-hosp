import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../config/firebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registration successful');
    } catch (error) {
      Alert.alert('Registration failed', (error as Error).message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;