cycle-vale-backend/
├── node_modules/                  # Folder for all the node modules installed
├── src/                           # Source folder for all the application code
│   ├── controllers/               # Controllers for handling requests
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── orderController.js
│   │   └── reviewController.js
│   ├── models/                    # Mongoose models to represent database schemas
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── routes/                    # Express routes that define your API endpoints
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   └── reviewRoutes.js
│   ├── middleware/                # Custom middleware, e.g., for authentication
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── utils/                     # Utility functions and helpers
│   │   ├── database.js           # Utility for database connection
│   │   └── helpers.js
│   ├── app.js                     # Main application file where you set up middlewares, routes, etc.
│   └── server.js                  # Entry point that starts the server
├── .env                          # Environment variables for port, database URL, etc.
├── package.json                  # Node.js project manifest
├── package-lock.json             # Locked versions of each package installed
└── README.md                     # Project README with documentation