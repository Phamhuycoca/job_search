import { emailApi } from "./email.api";

export const useEmail = () => {
    const senMail =async(data:any)=>{
        try{
          return await emailApi.sendEmail(data);
        }catch (error){
          console.error("Error ChangeStatus");
        }
      };
      return{
        senMail
      };
};