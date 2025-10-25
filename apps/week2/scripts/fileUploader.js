(() => {
  function DropZone() {
    const infoText = document.createElement('p');
    infoText.textContent = '파일을 끌어다 놓거나 클릭하여 선택하세요.';
    const fileInput = document.createElement('input');
    fileInput.id = 'file-input';
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.setAttribute('multiple', 'true');

    const dropZone = document.createElement('div');
    dropZone.id = 'drop-zone';
    dropZone.append(infoText, fileInput);

    return {
      dropZone,
      fileInput,
    };
  }

  function StatusZone() {
    const statusZone = document.createElement('p');
    statusZone.id = 'status-zone';
    return statusZone;
  }

  const fileUploader = document.getElementById('file-uploader');
  const { dropZone, fileInput } = DropZone();
  const statusZone = StatusZone();
  fileUploader.append(dropZone, statusZone);

  function filterFile(items) {
    return items.filter((item) => item.kind === 'file');
  }

  function displayStatus(files) {
    for (const file of files) {
      const fileName = document.createElement('span');
      fileName.textContent = `${file.name}(${Math.round(file.size / 1024)}KB)`;
      const uploadStatus = document.createElement('span');
      uploadStatus.textContent = '대기';

      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.dataset.file = file.name;
      fileItem.append(fileName, uploadStatus);

      statusZone.append(fileItem);
    }
  }

  function updateStatus(fileName, status) {
    const fileItem = document.querySelector(
      `.file-item[data-file="${fileName}"]`
    );
    if (fileItem) {
      fileItem.children[1].textContent = status;
    }
  }

  async function uploadFile(file) {
    const url = 'http://localhost:3000/upload';

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('파일 업로드 성공:', file.name);
        updateStatus(file.name, '성공');
      } else {
        console.error('파일 업로드 실패:', file.name);
        updateStatus(file.name, '실패');
      }
    } catch (error) {
      console.error('업로드 중 에러 발생:', file.name, error);
      updateStatus(file.name, '에러');
    }
  }

  function uploadFiles(files) {
    for (const file of files) {
      uploadFile(file);
    }
  }

  window.addEventListener('dragover', (e) => {
    const fileItems = filterFile([...e.dataTransfer.items]);
    if (fileItems.length > 0) {
      e.preventDefault();
      if (!dropZone.contains(e.target)) {
        e.dataTransfer.dropEffect = 'none';
      }
    }
  });

  window.addEventListener('drop', (e) => {
    if ([...e.dataTransfer.items].some((item) => item.kind === 'file')) {
      e.preventDefault();
    }
  });

  dropZone.addEventListener('dragover', (e) => {
    const fileItems = filterFile([...e.dataTransfer.items]);
    if (fileItems.length > 0) {
      e.preventDefault();
      if (fileItems.some((item) => item.type.startsWith('image/'))) {
        e.dataTransfer.dropEffect = 'copy';
      } else {
        e.dataTransfer.dropEffect = 'none';
      }
    }
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();

    const files = [...e.dataTransfer.items]
      .map((item) => item.getAsFile())
      .filter((file) => file.type.startsWith('image/'));
    displayStatus(files);
    uploadFiles(files);
  });

  fileInput.addEventListener('change', (e) => {
    displayImages(e.target.files);
  });
})();
