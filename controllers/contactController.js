// desc Get all contact
// route
// access
const getContact = (req, res) => {
  res.status(200).json({ message: "You have accessed all contacts" });
};

const createContact = (req, res) => {
  res.status(201).json({ message: "created new user", body: req.body });
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
};

const singleGet = (req, res) => {
  res.status(200).json({ message: `Get contact of id: ${req.params.id}` });
};

const updateContact = (req, res) => {
  res.status(200).json({ message: `update contact of id: ${req.params.id}` });
};

const singleDelete = (req, res) => {
  res.status(200).json({ message: `deleted contact of id: ${req.params.id}` });
};

module.exports = {
  getContact,
  createContact,
  singleGet,
  updateContact,
  singleDelete,
};
