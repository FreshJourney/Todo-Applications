const express = require("express");
const app = express();
const User = require("../model/user.model");
const requestCounts = {};
const requestCountsDelete = {};

const rateLimiterCreate = (req, res, next) => {
  const userid = req.user?.id;
  if (!userid) {
    return res.status(401).json({ message: "Unauthorized: User ID required" });
  }
  console.log("userid", userid);

  const now = Date.now();

  if (!requestCounts[userid]) {
    requestCounts[userid] = { count: 1, lastRequest: now };
  } else {
    const timeSinceLastRequest = now - requestCounts[userid].lastRequest;
    const timeLimit = 24 * 60 * 60 * 1000;

    if (timeSinceLastRequest < timeLimit) {
      requestCounts[userid].count += 1;
    } else {
      requestCounts[userid] = { count: 1, lastRequest: now };
    }
  }

  const max_request = 5;
  if (requestCounts[userid].count > max_request) {
    return res.status(429).json({ message: "Too many requests" });
  }

  requestCounts[userid].lastRequest = now;
  next();
};

const rateLimiterDelete = (req, res, next) => {
  const userid = req.user?.id;
  if (!userid) {
    return res.status(401).json({ message: "Unauthorized: User ID required" });
  }
  console.log("userid", userid);

  const now = Date.now();

  if (!requestCountsDelete[userid]) {
    requestCountsDelete[userid] = { count: 1, lastRequest: now };
  } else {
    const timeSinceLastRequest = now - requestCountsDelete[userid].lastRequest;
    const timeLimit = 24 * 60 * 60 * 1000;

    if (timeSinceLastRequest < timeLimit) {
      requestCountsDelete[userid].count += 1;
    } else {
      requestCountsDelete[userid] = { count: 1, lastRequest: now };
    }
  }

  const max_request = 3;
  if (requestCountsDelete[userid].count > max_request) {
    return res.status(429).json({ message: "Too many requests" });
  }

  requestCountsDelete[userid].lastRequest = now;
  next();
};

module.exports = { rateLimiterCreate, rateLimiterDelete };
