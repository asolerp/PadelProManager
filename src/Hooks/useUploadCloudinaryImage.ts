import {useState} from 'react';

export const useUploadCloudinaryImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const uploadCloudinary = async (photo, folder = '/', callback) => {
    setLoading(true);
    const source = {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    };

    const data = new FormData();
    data.append('file', source);
    data.append('upload_preset', 'padel_pro');
    data.append('cloud_name', 'enalbis');
    data.append('folder', folder);

    const url = await fetch('https://api.cloudinary.com/v1_1/enalbis/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => data.secure_url)
      .then(url => {
        return callback(url);
      })
      .catch(err => {
        setError(err);
      });

    return url;
  };

  return {
    uploadCloudinary,
    loading,
    error,
  };
};
