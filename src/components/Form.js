
import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { validateName, validateEmail, validatePassword } from '../utils/validation';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    // Handle successful form submission here
    console.log('Form submitted:', { name, email, password });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        onBlur={() => setErrors({ ...errors, name: validateName(name) })}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        onBlur={() => setErrors({ ...errors, email: validateEmail(email) })}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        onBlur={() => setErrors({ ...errors, password: validatePassword(password) })}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <Button title="Submit" onPress={handleSubmit} disabled={!!(errors.name || errors.email || errors.password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Form;
