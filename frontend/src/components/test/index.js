import React from 'react';
import { CRButton } from 'components/widgets';
import axios from 'axios';
import download from 'js-file-download';
const Test = props => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleClick = async () => {
    setLoading(true);
    setError(null);

    let res = null;

    try {
      // add any additional headers, such as authorization, as the second parameter to get below
      // also, remember to use responseType: 'blob' if working with blobs instead, and use res.blob() instead of res.data below
      res = await axios({
        url: 'http://localhost:4000/pdf',
        method: 'GET',
        responseType: 'blob',
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      return;
    }

    const data = res.data; // or res.blob() if using blob responses

    const url = window.URL.createObjectURL(
      new Blob([data], {
        type: res.headers['content-type'],
      })
    );

    // uses the download attribute on a temporary anchor to trigger the browser
    // download behavior. if you need wider compatibility, you can replace this
    // part with a library such as filesaver.js
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  // const getPdf = () => {
  //   axios({
  //     url: 'http://localhost:4000/pdfFromHTML',
  //     method: 'GET',
  //     responseType: 'blob',
  //     headers: {
  //       'Access-Control-Allow-Origin': true,
  //     },
  //   }).then(response => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'file.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // };
  return (
    <div>
      <h1>Generate PDF</h1>
      <CRButton onClick={handleClick}>Get Pdf</CRButton>
    </div>
  );
};

Test.propTypes = {};

export default Test;
