export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader: any = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
        resolve(fileReader.result?.split(",")[1]);
    };

    fileReader.onerror = (error: any) => {
        reject(error);
    };
});
};