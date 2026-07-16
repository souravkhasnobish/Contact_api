import express from "express"
import { deleteContactById, getallContact, getcontactById, getcontactUserById, newContact, updateContactById } from "../Controller/contact.js"
import { isAuthenticated } from "../Middleware/Auth.js"

const router = express.Router()

//new contact created
router.post("/new",isAuthenticated,newContact)

//get all contact
router.get("/",getallContact)


//get contact by id
router.get("/:id", getcontactById)

//Update contact by id
router.put("/:id",isAuthenticated,updateContactById)
//Delete contact by id

router.delete("/:id", isAuthenticated, deleteContactById)

//get user specific contact
router.get("/userid/:id", getcontactUserById)
export default router;