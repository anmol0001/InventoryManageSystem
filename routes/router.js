const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Bill = require('../models/bill')

// Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    if (!items || !items.length)
      return res.status(400).json({ message: 'Oops! There are no items in the inventory found' });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new item
router.post('/items', async (req, res) => {
  try {
    const name = req.body?.itemName ?? null
    if (!name)
      return res.status(400).json({ message: 'Item Name Not Found!!' });

    const item = await Item.findOne({ itemName: name })
    if (item) {
      res.status(400).json({ message: 'Oh! Its already added in inventory.If you want to change anything you can update.' });
    }
    else {
      const item = new Item({
        itemName: req.body.itemName.toLowerCase(),
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
      });

      const newItem = await item.save();
      res.status(201).json(newItem);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a bill
router.post('/bills', async (req, res) => {
  try {
    const { customerName, items } = req.body;
    let totalAmount = 0;
    const billItems = [];

    if (!customerName)
      return res.status(400).json({ message: 'Customer name should be important to know for bill creation' });

    // Iterate over each item and create billItems array
    for (const item of items) {
      const dbItem = await Item.findOne({ itemName: item.itemName });

      if (!dbItem) {
        return res.status(404).json({ message: `Item with name ${item.itemName} not found` });
      }

      const quantity = parseInt(item.quantity);

      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: `Invalid quantity for item ${dbItem.itemName}` });
      }

      if (dbItem.quantity < quantity) {
        return res.status(400).json({ message: `Insufficient quantity for item ${dbItem.itemName}` });
      }
      let totalPricePerItem = dbItem.price * quantity
      totalAmount += totalPricePerItem;
      billItems.push({ itemId: dbItem._id, itemName: dbItem.itemName, quantity, price: dbItem.price, totalPricePerItem });
      dbItem.quantity -= quantity;
      await dbItem.save();
    }

    const bill = new Bill({
      customerName: customerName.toLowerCase(),
      items: billItems,
      totalAmount
    });

    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an item in the inventory by name or ID using query parameters
router.put('/updateItems', async (req, res) => {
  try {
    const { type, identifier } = req.query; // Get the type and identifier from query parameters
    const { price, quantity } = req.body; // Extract update fields from the request body
    let item;
    // If price or quantity is provided in the request body, update only those fields
    let updateFields = price && quantity ? { price, quantity } : (!price ? (!quantity ? null : { quantity }) : { price })

    if (!updateFields)
      return res.status(400).json({ message: 'You can send request without updated values of price or quantity' });

    if (type === 'name') {
      // Update item by name
      item = await Item.findOneAndUpdate(
        { itemName: identifier },
        { $set: updateFields },
        { new: true }
      );
    } else if (type === 'id') {
      // Update item by ID
      item = await Item.findByIdAndUpdate(
        identifier,
        { $set: updateFields },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: 'Invalid type parameter. Must be "name" or "id".' });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item from inventory
router.delete('/deleteItems/:id', async (req, res) => {
  try {
    const itemId = req.params.id; // Get the item ID from the request parameters
    // Find the item by its ID and remove it
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (deletedItem) {
      // Item deleted successfully
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      // Item not found
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// Get all bills
router.get('/bills', async (req, res) => {
  try {
    const bills = await Bill.find();
    if (!bills || !bills.length)
      return res.status(404).json({ message: 'Oops! There are no bills created yet.' });

    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific bill
router.get('/bills/:id', async (req, res) => {
  try {
    let bill = await Bill.findById(req.params?.id)
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json(bill);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
