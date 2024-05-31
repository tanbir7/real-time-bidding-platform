const { Item } = require('../models');
const ItemService = require('../services/itemService');
const path = require('path');

exports.getItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page number, default: 1
        const limit = parseInt(req.query.limit) || 10; // Number of items per page, default: 10

        const offset = (page - 1) * limit; // Calculate offset for pagination

        // Fetch items with pagination
        const items = await Item.findAndCountAll({
            offset,
            limit,
        });

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(items.count / limit),
            totalCount: items.count,
            items: items.rows,
        });
    } catch (error) {
        console.error("Error in getItems:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getItemById = async (req, res) => {
    try {
        const item = await ItemService.getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { name, description, starting_price, end_time } = req.body;
     
        const userId = req.user.id;
        let image_url = null;
        if (req.file) {
            image_url = path.posix.join('uploads', req.file.filename); // Use path.posix.join
        }
        const item = await ItemService.createItem({
            name,
            description,
            starting_price,
            current_price: starting_price,
            image_url,
            end_time,
            userId
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error)
    }
};

exports.updateItem = async (req, res) => {
    try {
        // Extract request body
        const body = req.body;

        // Find the item by ID
        const item = await ItemService.getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Check if the user has permission to update the item
        if (req.user.id !== item.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Update the item
        await item.update(body);
      
        // Send response
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteItem = async (req, res) => {
    try {
        const item = await ItemService.getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        if (req.user.id !== item.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await ItemService.deleteItem(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
