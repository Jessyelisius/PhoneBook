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

module.exports = {
    CreateContact
}