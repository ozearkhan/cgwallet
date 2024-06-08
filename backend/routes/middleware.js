const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Ensure decoded token has userId
        if (decoded.user_id) {
            req.userId = decoded.user_id; // Correctly set req.userId
            return next();
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }

    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = {
    authMiddleware
};
