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

const GetContact = async(req, res) => {
    try {
        let availableContact = await ContactModel.findOne({UserId: req.user.id});

        if(!availableContact) return res.status(400).json({Error: true, Message: "no contact available"});

        const contacts = await ContactModel.find({UserId:req.user.id}).sort({createdAt: -1});
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({Error:true, Message: "Error fetching user contacts"})
        console.log(error);
        
    }
}


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
        if(!id) return res.status(400).json({Error: true, Message: "specify a contact id to get"});

        const user = await ContactModel.findById(id);
        if(!user) return res.status(400).json({Error: true, Message: "contact is either deleted or not found"});
        res.status(200).json({Error: false, Message: "Contact retrieved!", Data: user});
    }
    catch(error){
        console.log(error);
        res.status(400).json({Error: true, Message: "Error trying to get contact"})
    }
}

const updateContact = async(req, res) => {
    try {
        //get the id to update
        const id = req.params.id;
        if(!id) return res.status(400).json({Error: true, Message: "specify a contact id to update"});

        const updateContact = req.body;

        if(!updateContact.Name)return res.status(400).json({Error: true, Message: "contact name is needed"});
        if(!updateContact.PhoneNo)return res.status(400).json({Error: true, Message: "contact phone number is needed"});
        if(!updateContact.Email)return res.status(400).json({Error: true, Message: "contact email is needed"});
        if(!updateContact.Address)return res.status(400).json({Error: true, Message: "contact address is needed"});
        if(!updateContact.DOB)return res.status(400).json({Error: true, Message: "contact dob is needed"});
        if(!updateContact.Tags)return res.status(400).json({Error: true, Message: "pls specify a tag for the contact"});

        const user = await ContactModel.findByIdAndUpdate(id, updateContact);
        
        if(!user) return res.status(400).json({Error: true, Message: "contact is either deleted or not found"});
        res.status(200).json({Error: false, Message: "Contact updated!", Data: user});

    } catch (error) {
        console.log(error);
        res.status(400).json({Error: true, Message: "Error trying to update"});
    }
}

const deleteContact = async(req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({Error: true, Message: "specify a contact id to delete"});

        const user = await ContactModel.findByIdAndDelete(id);
        if(!user) return res.status(400).json({Error: true, Message: "contact is either deleted or not found"});

        res.status(200).json({Error: false, Message: "Contact deleted!"});

    } catch (error) {
        
    }
}

module.exports = {
    CreateContact,
    GetContact,
    // GetUserByTags,
    GetSingleContact,
    updateContact,
    deleteContact
}