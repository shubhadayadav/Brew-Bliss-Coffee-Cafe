new Swiper(".menu-scroll", {
    // Optional parameters
    slidesPerView: 3,
    spaceBetween: 30,
    //   loop: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// Sending Data From Frontend to Backend

let form=document.getElementById('reservationForm')

form.addEventListener('submit',async (e)=>{
    e.preventDefault();


    console.log(" Form Submitted");
    
    let reservationData={
        name:document.getElementById('name').value,
        tel:document.getElementById("user_number").value,
        emailId:document.getElementById("user_emialId").value,
        selectDate:document.getElementById("user_selectDate").value,
        selectTime:document.getElementById("user_selectTime").value,
        Guests:document.getElementById("guests").value,
        selectTime:document.getElementById("user_selectTime").value,
        indoor:document.getElementById("_indoor").checked,
        outdoor: document.getElementById("_outdoor").checked,
        noPreference: document.getElementById("no_prefer").checked ,
        specialRequest: document.getElementById("special_request").value ,

    }

    const response=await fetch("http://localhost:5000/api/reservation",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(reservationData)
       
    });
        
    const data=await response.json() ;

    console.log(data.message);
    
    

});