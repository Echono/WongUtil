require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('path');

const registerComamnds = () => {
    const commands = [];
    const appdir = path.dirname(require.main.filename);
    debugger
};

module.exports = {
    registerComamnds
}