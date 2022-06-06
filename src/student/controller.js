const poll = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
  poll.query(queries.getStudents,(error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
}

const getStudentById = (req, res) => {
 const id = parseInt(req.params.id);
 poll.query(queries.getStudentById, [id], (error, results) => {
   if (error) throw error;
   res.status(200).json(results.rows);
 });
}

const addStudent = (req, res) => {
 const { name, email, age, dob } = req.body;

 // Check if email exists.
  poll.query(queries.checkEmailExist, [email], (error, results) => {
    if(results.rows.length){
      res.send("Email already exists!");
    }

    // Add student to db
    poll.query(queries.addStudent, [name, email, age, dob], (error, results) => {
      if (error) throw error;
      res.status(200).send('Student created successfully!');
    })
  })
}

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
  poll.query(queries.getStudentById, [id], (error, results) => {
    const nonStudentFound = !results.rows.length;
    if(nonStudentFound) {
      res.send('Student does not exist!');
    }

    poll.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send('Student successfully deleted!');
    })
  })
}

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);

  const { name } = req.body;
  poll.query(queries.getStudentById, [id], (error, results) => {
    const nonStudentFound = !results.rows.length;
    if(nonStudentFound) {
      res.send('Student does not exist!');
    }

    poll.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send('Student successfully updated!');
    })
  })

}


module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent
}