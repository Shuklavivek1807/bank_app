const Validation =(data)=>{
    let errors={};

    if(!data.fname){
        errors.fname='**first  name is required';
    }else if (data.fname.length <3 || data.fname.length>15){
        errors.fname='**Enter name should between 3 to 15'}
    else if (!/^[a-zA-Z]*$/g.test(data.fname)) {
        errors.fname="**Invalid name, only alphabets are allowed";
    }

    if(!data.contact){
        errors.contact='**contact is required';
    }
    else if (!/^[0-9\-\+]{9,15}$/g.test(data.contact)) {
        errors.contact="**Only number allowed & not be less than 10 digit";
    }

    if(!data.balance){
        errors.amount='**amount is required';
    }else if (!/^[0-9]*$/g.test(data.balance)) {
        errors.amount="**Only number allowed";
    }else if(data.balance<0){
        errors.amount="**Incorrect amount"
    }
    
    var today = new Date();
    if(!data.date){
        errors.date="**date is required";
    }else if(data.date.getFullYear>(today.getFullYear()-5)){
        errors.date="minimum age should b 5 years"
    }

    if(!data.address){
        errors.address='**address is required';
    }else if (data.address.length <10){
        errors.fname='**Enter name should between 3 to 15'
    }

    if(!data.email){
        errors.email='**email is required';
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.email)){
        errors.email='**email invalid'
    }


    if(!data.pass){
        errors.password='**password required';
    }else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(data.pass)){
        errors.password='**Minimum eight characters, at least one letter, one number and one special character required'
    }
    return errors;
}
export default Validation;