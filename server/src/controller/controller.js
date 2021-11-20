const coinModelData = require('../models/index');

// Adding Data

const addData = async (req, res) => {
  const body = req.body;
  try {
    const newData = new coinModelData(body);
    await newData.save();
    res.json(newData).status(201);
  } catch (error) {
    res.status(500);
    console.error('Error in Add data!', error);
  }
};

// Getting Data

const getAllData = async (req, res) => {
  try {
    const allData = await coinModelData.find();
    res.json(allData).status(200);
  } catch (error) {
    res.status(500);
    console.error('Error in getting Data', error);
  }
};

// Delete Data

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await coinModelData.findByIdAndRemove(id);
    res.json(id).status(200);
  } catch (error) {
    res.status(500);
    console.log('Error in removing', error);
  }
};

module.exports = { addData, getAllData, deleteData };
