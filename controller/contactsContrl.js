const ContactModel = require("../model/Contact.model");


const CreateContact = async(req, res) => {

    try {
        const input = req.body;

        const existingPhone = await ContactModel.findOne({PhoneNo: input.PhoneNo})
            if(existingPhone)return res.status(400).json({Error:true, Message: "Contact is already saved"})

        if(!input.Name)return res.status(400).json({Error: true, Message: "contact name is needed"});
        if(!input.PhoneNo)return res.status(400).json({Error: true, Message: "contact phone number is needed"});
        if(!input.Email)return res.status(400).json({Error: true, Message: "contact email is needed"});
        if(!input.Address)return res.status(400).json({Error: true, Message: "contact address is needed"});
        if(!input.DOB)return res.status(400).json({Error: true, Message: "contact dob is needed"});
        if(!input.Tags)return res.status(400).json({Error: true, Message: "pls specify a tag for the contact"});

        const user = await ContactModel.create({
            Name:input.Name,
            PhoneNo:input.PhoneNo,
            Email:input.Email,
            Address:input.Address,
            DOB:input.DOB,
            Tags:input.Tags,
            UserId: req.user.id
        })
        res.status(201).json({Error: false, Message: "contact created"});
    } catch (error) {
        res.status(404).json({Error: true, Message: "Error creating contact"});
        console.log(error);
    }
}

const GetContact = async(req, res) => {
    try {
        let availableContact = await ContactModel.findOne({UserId: req.user.id});

        if(!availableContact) return res.status(400).json({Error: true, Message: "no contact available"});

        const contacts = await ContactModel.find({UserId:req.user.id});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({Error:true, Message: "Error fetching user contacts"})
        console.log(error);
        
    }
}

const GetUserByTags = async(req, res) => {
    try {
        //checking and validating tags
        const {tags} = req.query;

        if(!tags) return res.status(400).json({Error: true, Message: "pls provide tag to filter user"});
        //incase of multiple tags
        const toArray = tags.split(",");

        //find users with the specified tag from the db
        const user = await ContactModel.find({Tags:{$in: toArray}});

        if(user.length === 0)return res.status(400).json({Error: true, Message: "Error no user found with the specified tag"})

        res.status(200).json({Error: false, Message: "User retrieved: ", Data: user});
        
    } catch (error) {
        console.error("trouble with tag", error);
        res.status(500).json({Error: true, Message: "unable to get tags"})  
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
        res.status(200).json({Error: false, Message: "Contact updated!"});

    } catch (error) {
        console.log(error);
        res.status(400).json({Error: true, Message: "Error trying to update"});
    }
}

module.exports = {
    CreateContact,
    GetContact,
    GetUserByTags,
    updateContact
}