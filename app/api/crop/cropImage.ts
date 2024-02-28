async function onDownloadCropClick() {
  const image = imgRef.current;
  if (!image || !completedCrop) {
    throw new Error('Image or completed crop does not exist');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const response = await fetch('/api/cropImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageUrl: image.src,
      crop: completedCrop,
    }),
  });

  if (!response.ok) {
    console.error('Failed to crop image:', response.statusText);
    return;
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  if (blobUrlRef.current) {
    URL.revokeObjectURL(blobUrlRef.current);
  }

  blobUrlRef.current = blobUrl;

  // Update the image URL in sessionStorage
  sessionStorage.setItem('EditedImage', blobUrl);
}
