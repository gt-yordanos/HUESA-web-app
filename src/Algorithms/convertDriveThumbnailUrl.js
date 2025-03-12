// Function to convert Google Drive URL to thumbnail URL
const convertDriveThumbnailUrl = (url) => {
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return '';
};

export default convertDriveThumbnailUrl