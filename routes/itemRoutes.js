// routes/itemRoutes.js
const express = require('express');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
// const multer = require('multer');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), upload.single('image'), createItem);
router.put('/:id', authMiddleware, roleMiddleware(['user', 'admin']), upload.single('image'), updateItem);
router.delete('/:id', authMiddleware, roleMiddleware(['user', 'admin']), deleteItem);

module.exports = router;