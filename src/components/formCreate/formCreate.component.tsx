import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './style.module.css';
import { DragonProp } from '../../../src/types';
import Link from 'next/link';

interface FormCreateProps {
  errorMessage?: string;
  onCreate(dragon: DragonProp): void;
}

export const FormCreate = ({ onCreate }: FormCreateProps) => {
  const [name, setName] = useState('');
  const [typeDragon, setType] = useState('');
  const [histories, setHistorie] = useState('');

  const handleSubmit = () => {
    onCreate({ name, type: typeDragon, histories });
  };

  return (
    <div className={styles.formCreate}>
      <Form className={styles.form}>
        <Form.Group className={styles.group} controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.group} controlId="typeDragon">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            value={typeDragon}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="typeDragon">
          <Form.Label>História</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            value={histories}
            onChange={(e) => setHistorie(e.target.value)}
          />
        </Form.Group>
        <div className={styles.buttons}>
          <Link href="/">
            <a className="btn btn-secondary btn-sm">Voltar</a>
          </Link>
          <Button
            size="sm"
            variant="success"
            type="button"
            onClick={() => handleSubmit()}
          >
            Criar
          </Button>
        </div>
      </Form>
    </div>
  );
};
