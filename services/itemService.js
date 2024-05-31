// services/itemService.js
const { Item } = require('../models');

class ItemService {
    static async getAllItems({ page = 1, size = 10 }) {
        const { count, rows } = await Item.findAndCountAll({
            limit: size,
            offset: (page - 1) * size,
        });
        return {
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            items: rows,
        };
    }

    static async getItemById(id) {
        const item = await Item.findByPk(id);
        return item;
    }

    static async createItem({ name, description, starting_price, image_url, end_time, userId }) {
       
        const item = await Item.create({ name, description, starting_price, current_price: starting_price, image_url, end_time, userId });

        return item;
    }

    static async updateItem(id, { name, description, starting_price, end_time }) {
        const item = await Item.findByPk(id);
        if (!item) throw new Error('Item not found');
        console.log(name)
        // Update the item with the new values
        try {
            const updatedItem = await item.update({ name, description, starting_price, end_time });
            // console.log('Updated Item:', updatedItem.dataValues);
            // console.log('Changed properties:', updatedItem._changed);
            return updatedItem;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update item');
        }
    }
    

    static async deleteItem(id) {
        const item = await Item.findByPk(id);
        if (!item) throw new Error('Item not found');
        await item.destroy();
        return item;
    }
}

module.exports = ItemService;
