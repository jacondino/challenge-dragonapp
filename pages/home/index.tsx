import { useEffect, useState } from 'react';
import { DragonsService } from '../../src/service';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CardDragon } from '../../src/components';
import Link from 'next/link';
import styles from './style.module.css';

export default function HomePage() {
  const [dragons, setDragons] = useState([]);
  const [error, setError] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      getDragons();
    } else {
      router.push('/login');
    }
  }, []);

  const getDragons = async () => {
    try {
      const response = await DragonsService.listDragons();

      setDragons(response);
    } catch {
      setError(true);
    }
  };

  const deleteDragon = async (id: string) => {
    try {
      await DragonsService.deleteDragon(id);
    } catch {
      setError(true);
    } finally {
      getDragons();
    }
  };

  return (
    <Container>
      <div className={styles.create}>
        <Link href={`/create`}>
          <a className="btn btn-primary btn-lg">Criar dragão</a>
        </Link>
      </div>
      <Row md={4}>
        {dragons ? (
          dragons.map((dragon) => (
            <Col key={`dragon${dragon.id}`}>
              <CardDragon
                dragon={dragon}
                deleteDragon={(id) => deleteDragon(id)}
              />
            </Col>
          ))
        ) : (
          <h2>Não possui dragões ainda</h2>
        )}
      </Row>
      {error && <Alert variant="danger">Erro ao enviar a solicitação!</Alert>}
    </Container>
  );
}
