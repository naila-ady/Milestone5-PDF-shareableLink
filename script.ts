//listing element
document.getElementById('resumeForm')?.addEventListener('submit',function(event){
    event.preventDefault();
    console.log('form submitted')
    //type assertion
    const profilePictureInput =document.getElementById('profilePicture')as HTMLInputElement;
    const nameElement=document.getElementById('name')as HTMLInputElement;
    const emailElement=document.getElementById('email')as HTMLInputElement;
    const phoneElement=document.getElementById('phone')as HTMLInputElement;
    const educationElement=document.getElementById('education')as HTMLTextAreaElement;
    const skillsElement=document.getElementById('skills')as HTMLTextAreaElement;
    const experienceElement=document.getElementById('experience')as HTMLTextAreaElement;
    
    //adding url 
    const userNameElement=document.getElementById('userName')as HTMLInputElement;


    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && skillsElement && experienceElement && userNameElement){
        
      //getting values from form
      const name=nameElement.value;
        const email=emailElement.value;
        const phone=phoneElement.value;
        const education=educationElement.value;
        const skills=skillsElement.value;
        const experience=experienceElement.value;
       
       //creating uniuque path
        const userName=userNameElement.value;
        const uniquePath=`resumes/${userName.replace(/\s+/g,'_')}_cv.html`;

 
        //profilepicture elements
        const profilePictureFile= profilePictureInput.files?.[0]
        const profilePictureURL= profilePictureFile ? URL.createObjectURL(profilePictureFile):'';
       
    
//create resumeOutput
        const resumeOutput=`
  <h2>Resume</h2>
  ${profilePictureURL ? `<img src="${profilePictureURL} " alt="ProfilePicture" class="profilePicture">`:''};
    <p><strong>Name:</strong><span id="edit-name"class="editable">${name}</span></p>
  <p><strong>Email:</strong><span id="edit-email"class="editable">${email}</span></p>
  <p><strong>Phone:</strong><span id="edit-phone"class="editable">${phone}</span></p>

  <h3>Education</h3>
  <p id="edit_education" class="editable">${education}</p>

  <h3>Skills</h3>
  <p id="edit-skills" class="editable" >${skills}</p>

  <h3>Experience</h3>
  <p id ="edit-experience" class="editable">${experience}</p>
    `;
    //code for downloading url link
     const downloadLink=document.createElement('a')
     downloadLink.href='data:text/html;charset=utf-8,'+encodeURIComponent(resumeOutput)
     downloadLink.download=uniquePath;
     downloadLink.textContent='Download your fresh resume now!';  

    //resume output variable
  const resumeOutputElement=document.getElementById('resumeOutput');
  if(resumeOutputElement){
    resumeOutputElement.innerHTML=resumeOutput;
    resumeOutputElement.classList.remove("hidden");
    

//     //*making code editable
//     resumeOutputElement.appendChild(downloadLink)
//     resumeOutputElement.style.display="block";
//  makeEditable();
//   }else{
//     console.error('one or more output elements are missing')
//   }  

// function makeEditable(){
//   const editableElements=document.querySelectorAll('editable');
//   editableElements.forEach(element =>{
//     element.addEventListener('click',function(){
//       const currentElement=element as HTMLElement;
//       const currentValue=currentElement.textContent ||"";
//       //replace content
//       if(currentElement.tagName==="P" || currentElement.tagName==="span"){
//         const input=document.createElement('input')
//         input.type='text'
//         input.value=currentValue
//         input.classList.add('editing-input')

//         input.addEventListener('blur',function(){
//           currentElement.textContent=input.value;
//           currentElement.style.display='inline';
//           input.remove()
//         })   
//         currentElement.style.display="none"
//         currentElement.parentNode?.insertBefore(input,currentElement);
//         input.focus()
//       }

//     })
//   })

//code for creating buttons
const buttonsContainer=document.createElement("div");
buttonsContainer.id="buttonsContainer";
resumeOutputElement.appendChild(buttonsContainer);
  

//adding button for pdf downloading
const downloadButton=document.createElement("button");
downloadButton.textContent="Download as PDF";
downloadButton.addEventListener("click",()=>{
  window.print();
});
buttonsContainer.appendChild(downloadButton);

//adding button for shareable link
const shareLinkButton=document.createElement("button");
shareLinkButton.textContent="Copy Shareable Link";
shareLinkButton.addEventListener("click",async()=>{
  try{
    const shareableLink=`https://yourdomain.com/resumes/${name.replace(/\s+/g,"_")}_cv.html`;

//use clipboard API to copy shareable link
await navigator.clipboard.writeText(shareableLink);
alert("Shareable link copied to clipboard!");
  }catch(err){
    console.error("Failed to copy link:", err);
    alert("Failed to copy link.Please try again");
  }
});
buttonsContainer.appendChild(shareLinkButton);
}else{
console.error("Resume output container not found");
}
}else{
console.error("form elements are missing");
}
}
)

