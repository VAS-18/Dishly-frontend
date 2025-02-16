import axiosInstance from "@/lib/axios";

//ERROR HANDLING
const handleApiError = (error) => {
  if(error.response && error.response.data){
    const {data} = error.response;
    if(data.error){
      throw new Error(data.error);
    }
    else if(data.message){
      throw new Error(data.message);
    }
    else{
      throw new Error("An unexpected error occurred");
    }
  }else{
    throw new Error("Network Error Occured");
  }
}


export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    const { accessToken, refreshToken } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {}
};

export const register = async (FormData) => {
  try {
    const response = await axiosInstance.post("/auth/register", FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {

  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}