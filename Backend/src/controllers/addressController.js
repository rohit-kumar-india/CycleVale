const User = require("../models/User");
const mongoose = require('mongoose');

exports.addAddress = async (req, res) => {
    const { userId, newAddress } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.addresses.push(newAddress);
        await user.save();
        console.log('Address added successfully');
        res.status(200).send({ message: 'Address added successfully' });
    } catch (error) {
        console.error('Error adding address:', error.message);
    }
}

exports.updateAddress = async (req, res) => {
    const { addressId } = req.params;
    const { userId, updatedAddress } = req.body;
    try {
        // Find the user first
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Find the address index
        const addressIndex = user.addresses.findIndex(a => a._id.toString() === addressId);
        if (addressIndex === -1) {
            return res.status(404).send({ message: "Address not found." });
        }

        // Update the address at the found index
        user.addresses[addressIndex] = { ...user.addresses[addressIndex].toObject(), ...updatedAddress };

        // Save the user document
        await user.save();

        //res.send(user); // Send the updated user data
        console.log('Address added successfully');
        res.status(200).send({ message: 'Address added successfully' });
    } catch (error) {
        console.error('Error adding address:', error.message);
    }
}

exports.getAddresssesbyUserId = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assuming the addresss are stored directly in the user document
        res.status(200).json(user.addresses);

    } catch (error) {
        console.error("Error fetching address:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    const { userId, addressId } = req.body;

    console.log(userId, addressId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const updatedAddresses = user.addresses.filter(address => address.id !== addressId);

        user.addresses = updatedAddresses ? updatedAddresses : [];

        await user.save();

        res.status(200).send({ message: 'Address removed from user' });

    } catch (error) {
        console.error('Failed to delete address:', error);
        res.status(500).send('Error deleting address');
    }
};