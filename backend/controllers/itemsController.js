const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, imageUrl, rarity } = req.body;
    const newItem = new Item({ name, description, imageUrl, rarity });
    await newItem.save();
    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, description, imageUrl, rarity } = req.body;
    const item = await Item.findByIdAndUpdate(req.params.id, { name, description, imageUrl, rarity }, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

