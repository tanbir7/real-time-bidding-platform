// controllers/bidController.js
const BidService = require('../services/bidService');


exports.getBids = async (req, res) => {
    try {
        const bids = await BidService.getBidsByItemId(req.params.itemId);
        res.status(200).json(bids);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.placeBid = async (req, res) => {
   const io = req.app.get('io');
  
    const  itemId  = req.params.itemId;
    const  bidAmount  = req.body.bidAmount;
    const userId = req.user.id;
  
    try {
        const {bid, notification} = await BidService.placeBid(io, itemId, userId, bidAmount);
        
        res.status(201).json({bid, notification });
    } catch (error) {
        console.log(error)
        throw new Error(error.message); // Throw the error to be caught by the route handler
    }
};