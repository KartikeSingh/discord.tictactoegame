/**
 * An module to convert emoji to string
 * @param {String} emoji 
 * @returns {Number} emoji's number representative
 */
function getNumber(emoji) {
    if (emoji === "1️⃣") return 1;
    else if (emoji === "2️⃣") return 2;
    else if (emoji === "3️⃣") return 3;
    else if (emoji === "4️⃣") return 4;
    else if (emoji === "5️⃣") return 5;
    else if (emoji === "6️⃣") return 6;
    else if (emoji === "7️⃣") return 7;
    else if (emoji === "8️⃣") return 8;
    else if (emoji === "9️⃣") return 9;
    else return emoji;
}

module.exports = getNumber;