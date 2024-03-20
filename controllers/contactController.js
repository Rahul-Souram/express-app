const asyncHandler = require("express-async-handler");
// desc Get all contact
// route
// access
const Contact = require("../models/contactModel");

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res
    .status(200)
    .json({ data: contacts, message: "You have accessed all contacts" });
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject } = req.body;
  if (!name || !email || !phone || !subject) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
  });
  res.status(201).json(contact);
});

const singleGet = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res
    .status(200)
    .json({ data: contact, message: `Get contact of id: ${req.params.id}` });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    data: updateContact,
    message: `update contact of id: ${req.params.id}`,
  });
});

const singleDelete = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.remove();
  res.status(200).json({
    contact,
  });
});

module.exports = {
  getContact,
  createContact,
  singleGet,
  updateContact,
  singleDelete,
};
