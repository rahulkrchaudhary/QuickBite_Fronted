const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const api_url=`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

export const uploadImageToCloudinary= async(file)=>{
    const data= new FormData();
    data.append("file",file);
    data.append("upload_preset",upload_preset);
    data.append("cloud_name",cloud_name);

    try{
        const res = await fetch(api_url,{
            method:"POST",
            body:data
        })
    
        const fileData=await res.json();
        return fileData.url;
        // return fileData.secure_url;
    }catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
    }
}