import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Card,
  Form,
  Badge,
} from 'react-bootstrap';
import modalStyles from '../styles/Modals.module.css';
import {TiTick} from "react-icons/ti"
import { useState, useEffect } from 'react';

function EditModal({
  categories,
  show,
  onHide,
  todo,
  setTodos,
  todos,
  handleTodoCategories,
}) {
  useEffect(() => {
    setTemporaryTodo(todo.name);
  }, [todo]);

  const [temporaryTodo, setTemporaryTodo] = useState('');

  const updateTodoName = (e) => {
    e.preventDefault();
    let tempTodos = [...todos];
    let tempTodo = tempTodos[todos.indexOf(todo)];
    tempTodo.name = temporaryTodo;
    tempTodos[todos.indexOf(todo)] = tempTodo;
    setTodos([...tempTodos]);
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  return (
    <>
      <Modal show={show} onHide={onHide} size='lg' centered>
        <Container className={modalStyles.modal}>
          <Modal.Body>
            <form onSubmit={(e) => updateTodoName(e)}>
              <Row>
                <Col xs='9'>
                  <input
                    className={modalStyles.form}
                    type='search'
                    placeholder='Todo Name'
                    aria-label='Search'
                    value={temporaryTodo}
                    onChange={(e) => setTemporaryTodo(e.target.value)}
                  />
                </Col>

                <Col xs='3'>
                  <Button
                    className={modalStyles.addButton}
                    type='submit'
                    variant='primary'
                    style={{fontSize: "1.3rem"}}
                  >
                    <TiTick/>
                  </Button>
                </Col>
              </Row>
            </form>
            <Row style={{margin: "auto"}}>
              {todo.todoCategories.map((item, key) => {
                return (
                  <Col key={key} className={modalStyles.tag}>
                    {item.name}
                  </Col>
                );
              })}
            </Row>
            <Row style={{marginTop: "2rem"}}>
              {categories.map((category, key) => {
                let defaultCheck = false;
                const addedCategory = todo.todoCategories.filter(
                  (item) => item.id == category.id
                );
                if (addedCategory.length !== 0) {
                  defaultCheck = true;
                }
                return (
                  <Col xs={screen.width > 600 ? "6" : "12"} key={key}>
                    <Card className={modalStyles.categoryCard}>
                      <Card.Body className='categoryCard'>
                        <Row style={{display: "flex", alignItems: "center"}}>
                          <Col>{category.name}</Col>
                          <Col xs="3" sm="3" md="2" >
                            <Form.Check
                              defaultChecked={defaultCheck}
                              onClick={(e) =>
                                handleTodoCategories(e, category, todo)
                              }
                            />
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{backgroundColor: "#447ec0", border: "0"}} onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default EditModal;
