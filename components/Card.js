import { Col, Row, Card, Button } from 'react-bootstrap';
import styles from '../styles/Card.module.css';
import { MdClose } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';

export default function TodoCard({ todo, deleteTodo, editModal }) {
  return (
    <div>
      <Card className={styles.todo}>
        <Card.Body>
          <Row>
            <Col xs="18" lg="9" style={{ marginTop: '5px', marginBottom: '10px' }}>
              {todo.name}
            </Col>
            <Col >
              <Row>
                <Col xs="8" sm="9" md="10" lg="auto">
                  <Button
                    onClick={(e) => editModal(e)}
                    id={todo.id}
                    className={styles.editButton}
                    style={{marginRight: "1rem"}}
                  >
                    <HiPencil
                      style={{ pointerEvents: 'none', color: 'white' }}
                    />
                  </Button>
                </Col>
                <Col>
                  <button
                    onClick={(e) => deleteTodo(e, todo)}
                    className={styles.closeButton}
                  >
                    <MdClose style={{ color: 'black' }} />
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
