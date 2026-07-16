import { Contact } from "../Models/Contact.js";

//Create new Contact
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (name == "" || email == "" || phone == "" || type == "") {
    return res.json({ message: "All fields are required", success: false });
  }

  let savedcontact = await Contact.create({
    name,
    email,
    phone,
    type,
    user:req.user
  });

  res.json({ message: "Contact saved succesfully" });
};

//Update contact by id
export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const {name,email,phone,type}=req.body

  

  let updatedContact = await Contact.findByIdAndUpdate(id, { name, email, phone, type }, { new: true });
  

  if (!updatedContact) return res.json({ message: "No contact exist", success: false });
  res.json({ message: "Contact updated successfully",updatedContact, success: true });

}

export const deleteContactById = async (req, res) => {
  const id = req.params.id;
  

  let deletedContact = await Contact.findByIdAndDelete(id
  );

  if (!deletedContact)
    return res.json({ message: "No contact exist", success: false });
  res.json({
    message: "Contact deleted successfully",
    deletedContact,
    success: true,
  });
};

//Get all contact
export const getallContact = async (req, res) => {
  const contact = await Contact.find();
  if (!contact) {
    res.json({ message: "no contact found" });
  }
  res.json({ message: "Contact successfully fetched", contact, success: true });
};

//Get Contact by id
export const getcontactById = async (req, res) => {
  const id = req.params.id;

  const dbcontact = await Contact.findById(id);
  if (!dbcontact) {
    res.json({ message: "no contact found", success: false });
  }
  res.json({ message: "contact found", dbcontact, success: true });
};

//Update contact by user id
export const getcontactUserById = async (req, res) => {
  const id = req.params.id;

  const dbcontact = await Contact.find({user:id});
  if (!dbcontact) {
    res.json({ message: "no contact found", success: false });
  }
  res.json({ message: "user specfic contact found", dbcontact, success: true });
};


