import { memo } from 'react';
import Link from 'next/link';
import { DragonProp } from '../../types';
import { DateUtils } from '../../utils';
import { Card, Button } from 'react-bootstrap';
import styles from './style.module.css';

interface CardDragonProps {
  dragon: DragonProp;
  deleteDragon(id: string): void;
}

export const CardDragon = memo(({ dragon, deleteDragon }: CardDragonProps) => {
  const date = DateUtils.formatDate(dragon?.createdAt);

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>{dragon.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{dragon.type}</Card.Text>
        <div className={styles.buttons}>
          <Button
            size="sm"
            variant="danger"
            type="button"
            onClick={() => deleteDragon(dragon.id)}
          >
            Deletar
          </Button>
          <Link href={`/detail/${dragon.id}`}>
            <a className="btn btn-secondary btn-sm">Ver</a>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
});
