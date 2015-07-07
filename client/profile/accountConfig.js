AccountsTemplates.configure({
  negativeValidation: false,
  negativeFeedback: false,
  positiveValidation: false,
  positiveFeedback: false,

});

AccountsTemplates.addFields(

[{
    _id: 'firstName',
    type: 'text',
    placeholder: "First Name",
    required: true,
},
{
    _id: 'lastName',
    type: 'text',
    placeholder: "Last Name",
    required: true,
},

{
    _id: 'currentWeight',
    type: 'text',
    placeholder: "Current Weight",
},
{ 
	_id: "gender",
    type: "select",
    displayName: "Gender",
    required: true,
    select: [
        {
            text: "Male",
            value: "male",
        },
        {
            text: "Female",
            value: "female",
        },
    ],
}, 

// {
//         _id: 'terms',
//         type: 'checkbox',
//         displayName: 'I accept the terms and conditions',
//         validate: function(value, errorFunction){
//           if (value != 'true') {
//             errorFunction("You must accept the terms and conditions.");
//             return false;
//           } else {
//             return true;
//           }
//         },
//     }
]);
