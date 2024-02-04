const getPicUrl = async (pics, enqueueSnackbar, setPic, setPicLoading) => {
  setPicLoading(true);
  if (pics === undefined) {
    enqueueSnackbar("Error", { variant: "error" });
    return;
  }
  try {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData(); //FormData is a data structure that can store key-value pairs. It is primarily used to send form data, but can also be used independently to transmit keyed data.
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dqsozxnkl");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqsozxnkl/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const res = await response.json();
      setPic(res.url.toString());
      console.log(res.url.toString());
      enqueueSnackbar("Image uploaded successfully", {
        variant: "success",
      });
      setPicLoading(false);
    }
  } catch (error) {
    enqueueSnackbar("Invalid file format. Please select a JPEG or PNG image.", {
      variant: "error",
    });
    setPicLoading(false);
    return;
  }
};
export default getPicUrl;
