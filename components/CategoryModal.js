import { Button, Modal, Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import styles from '../styles/Card.module.css';

import modalStyles from '../styles/Modals.module.css';

function CategoryModal({setTodos, todos, setCategories, categories, show, onHide }) {
  const [categoryValue, setCategoryValue] = useState('');

  useEffect(() => {
    if (localStorage.getItem('categories')) {
      setCategories(JSON.parse(localStorage.getItem('categories')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(categoryValue === "") {
      document.getElementById("addCategoryInput").placeholder = "Write a Category !"
      document.getElementById("addCategoryInput").className = `${modalStyles.form} validate`
    } else {
      setCategories([...categories, { name: categoryValue, id: Date.now() }]);
      setCategoryValue('');
      document.getElementById("addCategoryInput").placeholder = "Write a Category"
      document.getElementById("addCategoryInput").className = `${modalStyles.form}`
    }
    
  };

  const deleteCategory = (e, category) => {
    e.preventDefault();
    setCategories(categories.filter((item) => item.id !== category.id));
    const deleteTodoCategory = (todo) => {
      const tempTodoCategory = todo.todoCategories.filter(item => item.id == category.id)
      if (tempTodoCategory.length != 0) {
        const index = todo.todoCategories.findIndex(x => x.id == category.id)
        todo.todoCategories.splice(index, 1)
      }
    }
    let tempTodos = [...todos]
    tempTodos.forEach(deleteTodoCategory)
    setTodos([...tempTodos])
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size='lg' centered>
        <Container className={modalStyles.modal}>
          <Modal.Body>
            <Row>
              <Col xs='9'>
                <input
                  id="addCategoryInput"
                  className={modalStyles.form}
                  maxLength="40"
                  type='search'
                  placeholder='Category'
                  aria-label='Search'
                  value={categoryValue}
                  onChange={(e) => setCategoryValue(e.target.value)}
                />
              </Col>
              <Col xs='3'>
                <Button
                  className={modalStyles.addButton}
                  type='submit'
                  variant='primary'
                  value='Submit'
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <Row>
              {categories.map((category, key) => {
                return (
                  <Col xs={screen.width > 600 ? "6" : "12"} key={key}>
                    <Card className={styles.categoryCard} >
                      <Card.Body style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Col xs='10' style={{paddingRight: "1rem"}}>
                          {category.name}
                        </Col>
                        <Col xs='2'>
                          <button
                            onClick={(e) => deleteCategory(e, category)}
                            className={styles.closeButton}
                          >
                            <MdClose style={{ color: 'black', display: "flex", alignItems: "center" }}/>
                          </button>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default CategoryModal;
