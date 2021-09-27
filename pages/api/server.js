const pdfKit = require("pdfkit");

const blobStream = require("blob-stream");

const doc = new pdfKit;

const todos = JSON.parse(localStorage.getItem('todos'))

const categories = JSON.parse(localStorage.getItem('categories'))

doc.fontSize(20);
doc.font('Helvetica')
 
todos.map((todo,key) => {
  doc.text((key + 1 ) + ") " +"Todo Name: " + todo.name)
   todo.todoCategories.map(category=>{
  doc.text("Category: " + category.name) 
  })
  doc.text(" ")

})

const stream = doc.pipe(blobStream())

doc.end();

stream.on('finish', function() {
  const url = stream.toBlobURL("application/pdf")
  const element = document.getElementById("pdf")
  element.setAttribute("href" , url)
})
