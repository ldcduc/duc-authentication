const fs = require('fs')

const userFile = 'mydb/users.json'
const sessionFile = 'mydb/session.json'

function readUserData(username) {
    try {
        const data = JSON.parse(fs.readFileSync(userFile, {encoding:'utf8', flag: 'r'}))
        return data[username]
    }
    catch (err) {
        return {}
    }
}

function readSessionData() {
    try {
        const data = JSON.parse(fs.readFileSync(sessionFile, {encoding: 'utf-8', flag: 'r'}))
        return data
    }
    catch (err) {
        return {}
    }
}

function readUsernameBySession(sessionId) {
    try {
        const data = JSON.parse(fs.readFileSync(sessionFile, {encoding: 'utf-8', flag: 'r'}))
        return data[sessionId]
    } 
    catch (err) {
        return {}
    }
}

function writeSession(session, username) {
    let sessionData = readSessionData()
    sessionData[session] = username
    fs.writeFileSync(sessionFile, JSON.stringify(sessionData))
}

function register(username, password) {
    try {
        const data = JSON.parse(fs.readFileSync(userFile, {encoding:'utf8', flag: 'r'}))
        data[username] = { 'password': password}
        fs.writeFileSync(userFile, JSON.stringify(data))
    }
    catch (err) {

    }
}

module.exports = {
    readUserData,
    writeSession,
    readUsernameBySession,
    register
}