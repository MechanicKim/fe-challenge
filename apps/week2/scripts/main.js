const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const statusZone = document.getElementById('status-zone');

window.addEventListener('drop', (e) => {
  if ([...e.dataTransfer.items].some((item) => item.kind === 'file')) {
    e.preventDefault();
  }
});

function filterFile(items) {
  return items.filter((item) => item.kind === 'file');
}

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

window.addEventListener('dragover', (e) => {
  const fileItems = filterFile([...e.dataTransfer.items]);
  if (fileItems.length > 0) {
    e.preventDefault();
    if (!dropZone.contains(e.target)) {
      e.dataTransfer.dropEffect = 'none';
    }
  }
});

function displayStatus(files) {
  for (const file of files) {
    const fileName = document.createElement('span');
    fileName.textContent = `file.name(${Math.round(file.size / 1024)}KB)`;
    const uploadStatus = document.createElement('span');
    uploadStatus.textContent = '대기';

    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.file = file.name;
    fileItem.append(fileName, uploadStatus);

    statusZone.append(fileItem);
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
      const fileItem = document.querySelector(
        `.file-item[data-file="${file.name}"]`
      );
      if (fileItem) {
        fileItem.children[1].textContent = '성공';
      }
    } else {
      console.error('파일 업로드 실패:', file.name);
      const fileItem = document.querySelector(
        `.file-item[data-file="${file.name}"]`
      );
      if (fileItem) {
        fileItem.children[1].textContent = '실패';
      }
    }
  } catch (error) {
    console.error('업로드 중 에러 발생:', file.name, error);
    const fileItem = document.querySelector(
      `.file-item[data-file="${file.name}"]`
    );
    if (fileItem) {
      fileItem.children[1].textContent = '에러';
    }
  }
}

function uploadFiles(files) {
  for (const file of files) {
    uploadFile(file);
  }
}

function dropHandler(ev) {
  ev.preventDefault();

  const files = [...ev.dataTransfer.items]
    .map((item) => item.getAsFile())
    .filter((file) => file.type.startsWith('image/'));
  displayStatus(files);
  uploadFiles(files);
}

dropZone.addEventListener('drop', dropHandler);

fileInput.addEventListener('change', (e) => {
  displayImages(e.target.files);
});
