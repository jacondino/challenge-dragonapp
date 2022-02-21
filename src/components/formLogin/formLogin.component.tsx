import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './style.module.css';

interface FormLoginProps {
  errorMessage?: string;
  onLogin(email: string, password: string): void;
}

export const FormLogin = ({ onLogin, errorMessage }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onLogin(email, password);
  };

  return (
    <div className={styles.formLogin}>
      <Form className={styles.form}>
        <Form.Group className={styles.group} controlId="text">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <span className="error">{errorMessage}</span>}
        <Button size="sm" type="button" onClick={() => handleSubmit()}>
          Login
        </Button>
      </Form>
    </div>
  );
};
