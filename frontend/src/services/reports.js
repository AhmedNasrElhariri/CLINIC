import axios from 'axios';
export const getPdfReport = (url, params, name) => {
  axios({
    url: url,
    method: 'POST',
    responseType: 'blob', // important
    params: params,
  })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {});
};
