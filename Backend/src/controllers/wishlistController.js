const User = require("../models/User");

exports.createWishlist = async (req, res) => {
    const { userId, wishlistName } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        let wishlist = user.wishlists.find(wl => wl.name === wishlistName);

        if (wishlist) {
            return res.status(400).send("Wishlist already exists");
        }

        wishlist = { name: wishlistName, items: [] };
        user.wishlists.push(wishlist);
        const updatedUser = await user.save();

        res.status(201).send({ message: 'Wishlist created successfully', wishlists: updatedUser.wishlists });
    } catch (error) {
        console.error('Failed to create wishlist:', error);
        res.status(500).send('Error creating wishlist');
    }
}

exports.getwishlistbyUserId = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assuming the wishlists are stored directly in the user document
        res.status(200).json(user.wishlists);

    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



exports.addWishlistItem = async (req, res) => {
    const { userId, wishlistId, productId } = req.body;
    let wishlist = null
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (wishlistId === null) {
            wishlist = user.wishlists[0];
        } else {
            wishlist = user.wishlists.find(wl => wl._id.toString() === wishlistId);
            if (!wishlist) {
                return res.status(404).send("Wishlist does not exists");
            }
        }
        //console.log(wishlist)
        let item = wishlist.items.find(item => item.product.toString() === productId);

        if (item) {
            return res.status(400).send("Item already present in Wishlist");
        }

        // Add the product to the wishlist
        wishlist.items.push({ product: productId });
        await user.save();

        res.status(201).send('Product added to wishlist');
    } catch (error) {
        console.error('Failed to add product to wishlist:', error);
        res.status(500).send('Error adding product to wishlist');
    }
};

exports.removeWishlistItem = async (req, res) => {
    const { userId, wishlistId, productId } = req.body;
    let wishlist = null
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (wishlistId === null) {
            wishlist = user.wishlists[0];
        } else {
            wishlist = user.wishlists.find(wl => wl._id.toString() === wishlistId);
            if (!wishlist) {
                return res.status(404).send("Wishlist does not exists");
            }
        }

        let updateditems = wishlist.items.filter(item => item.product.toString() !== productId);

        wishlist.items = updateditems ? updateditems : [];
        await user.save();

        res.status(200).send({ message: 'Product removed from wishlist' });

    } catch (error) {
        console.error('Failed to delete product from wishlist:', error);
        res.status(500).send('Error deleting product from wishlist');
    }
}