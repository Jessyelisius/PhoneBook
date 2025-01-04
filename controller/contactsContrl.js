const ContactModel = require("../model/Contact.model");


const CreateContact = async(req, res) => {

    try {
        const input = req.body;

        const existingPhone = await ContactModel.findOne({PhoneNo: input.PhoneNo})
            if(existingPhone)return res.render('index', {Message: "Contact is already saved"})

        if(!input.Name)return res.render('index', {Message: {Name: "contact name is needed"}});
        if(!input.PhoneNo)return res.render('index', {Message: {PhoneNo: "contact phone number is needed"}});
        if(!input.Email)return res.render('index', {Message: {Email: "contact email is needed"}});
        if(!input.Address)return res.render('index', {Message: {Address: "contact address is needed"}});
        if(!input.DOB)return res.render('index', {Message:{DOB: "contact dob is needed"}});
        if(!input.Tags)return res.render('index', {Message: {Tags: "pls specify a tag for the contact"}});


        const user = await ContactModel.create({
            Name:input.Name,
            PhoneNo:input.PhoneNo,
            Email:input.Email,
            Address:input.Address,
            DOB:input.DOB,
            Tags:input.Tags,
            UserId: req.user.id
        })
        res.redirect('listings');
    } catch (error) {
        res.render('index',{Message: {error: "Error creating contact"}});
        console.log(error);
    }
}

// const GetContact = async(req, res) => {
//     try {
//         let availableContact = await ContactModel.findOne({UserId: req.user.id});

//         if(!availableContact) return res.status(400).render('/404',{Message: "no contact available"});

//         const contacts = await ContactModel.find({UserId:req.user.id}).sort({createdAt: -1});
//         res.status(200).render('listings', contacts)
//     } catch (error) {
//         res.status(500).render('/404',{Message: {Error: "Error fetching user contacts"}})
//         console.log(error);
        
//     }
// }


// const GetUserByTags = async (req, res) => {
//     try {
//       const { tags } = req.query;
  
//       if (!tags) {
//         return res.status(400).render('listings', { 
//           user: [], 
//           Message: { noTags: "Please provide tags to filter users." } 
//         });
//       }
  
//       const toArray = tags.split(",");
//       console.log("Tags from request:", tags); // Debugging
//       console.log("Tags array:", toArray); // Debugging
  
//       const user = await ContactModel.find({ 
//         Tags: { $in: toArray.map(tag => new RegExp(`^${tag}$`, 'i')) } 
//       });
  
//       if (!user.length) {
//         return res.status(400).render('listings', { 
//           user: [], 
//           Message: "Error: No users found with the specified tag." 
//         });
//       }
  
//       res.render('listings', { user, Message: null });
  
//     } catch (error) {
//       console.error("Trouble with tag search:", error);
//       res.status(500).render('listings', { 
//         user: [], 
//         Message: "Error occurred while searching for users." 
//       });
//     }
//   };
  
  
const GetSingleContact = async(req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).render('listings',{ Message: "specify a contact id to get"});

        const user = await ContactModel.findById(id);
        if(!user) return res.status(400).render('listings',{Message: "contact is either deleted or not found"});
        res.status(200).render('contact',{Message: null});
    }
    catch(error){
        console.log(error);
        res.status(400).render('listings',{Message: "Error trying to get contact"})
    }
}

const updateContact = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.render('updateContact', {
                contact: {},
                Message: { error: "Specify a contact ID to update" },
            });
        }

        const { Name, PhoneNo, Email, Address, DOB, Tags } = req.body;

        if (!Name || !PhoneNo || !Email || !Address || !DOB || !Tags) {
            const contact = await ContactModel.findById(id); 
            return res.render('updateContact', {
                contact,
                Message: { error: "All fields are required to update the contact" },
            });
        }

        const updatedContact = await ContactModel.findByIdAndUpdate(id, {
            Name,
            PhoneNo,
            Email,
            Address,
            DOB,
            Tags,
        }, { new: true }); 

        if (!updatedContact) {
            return res.render('updateContact', {
                contact: {},
                Message: { error: "Contact is either deleted or not found" },
            });
        }

        res.redirect('/contacts/getAllContact');
    } catch (error) {
        console.log(error);
        res.status(400).render('updateContact', {
            contact: {},
            Message: { error: "Error trying to update the contact" },
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.render('listings', { Message: "Specify a contact ID to delete" });
        }

        const user = await ContactModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).render('listings', { Message: "Contact not found or already deleted" });
        }

        // Redirect to the listings page after deletion
        res.redirect('/contacts/getAllContact');
    } catch (error) {
        console.error(error);
        res.status(500).render('listings', { Message: "An error occurred while deleting the contact" });
    }
};


module.exports = {
    CreateContact,
    // GetContact,
    // GetUserByTags,
    GetSingleContact,
    updateContact,
    deleteContact
}