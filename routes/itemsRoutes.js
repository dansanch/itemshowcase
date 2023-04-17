const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const { checkAuth, checkAdmin } = require('../middleware/auth');

router.get('/', itemsController.getItems);
router.get('/:id', itemsController.getItem);
router.post('/', checkAuth, checkAdmin, itemsController.createItem);
router.put('/:id', checkAuth, checkAdmin, itemsController.updateItem);
router.delete('/:id', checkAuth, checkAdmin, itemsController.deleteItem);

module.exports = router;
