const generateUniqueRoomCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.ceil(Math.random() * 9);
  }
  return code;
};

module.exports = generateUniqueRoomCode;
