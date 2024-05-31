
const {Notification, Item} = require('../models');
const  {Bid}  = require('../models');


class BidService {
    static async getBidsByItemId(itemId) {
        try {
            return await Bid.findAll({ where: { itemId } });
        } catch (error) {
            console.error("Error in BidService.getBidsByItemId:", error.message);
            throw new Error('Failed to get bids by item ID');
        }
    }

    static async placeBid(io, itemId, userId, bidAmount) {
        
        try {

            const item =await Item.findByPk(itemId);
           
            if (!item) {
                throw new Error('Item not found');
            }

            if (item.userId === userId) {
                throw new Error('You cannot bid on your own item');
            }
            const newBid = await this.createBid(itemId, userId, bidAmount);
            await this.notifyUserAboutBid(userId, itemId, bidAmount);
            io.emit('bid-placed', {itemId:itemId, bid:newBid});
            return { bid: newBid, Notification };
        } catch (error) {
            console.error("Error in BidService.placeBid:", error.message);
            throw new Error('Failed to place bid');
        }
    }
    static async createBid(itemId, userId, bidAmount) {
        try {
            return await Bid.create({ itemId, userId, bidAmount });
        } catch (error) {
            console.error("Error in BidService.createBid:", error.message);
            throw new Error('Failed to create bid');
        }
    }

    static async notifyUserAboutBid(userId, itemId, bidAmount) {
        try {
            await Notification.create({
                userId,
                message: `You placed a bid of ${bidAmount} on item ${itemId}`,
            });
        } catch (error) {
            console.error("Error in BidService.notifyUserAboutBid:", error.message);
            throw new Error('Failed to create notification');
        }
    }
}


module.exports = BidService;
