const express = require('express');
const router = express.Router();
const { getAllData, addData, deleteData } = require('./controller/controller');

// Import from Controller

router.get('/', getAllData);
router.post('/', addData);
router.delete('/:id', deleteData);

module.exports = router;
