/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
export const createModal = () => {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');

  const modalContent = document.createElement('div');
  modalContent.setAttribute('id', 'modalContent');

  const close = document.createElement('span');
  close.setAttribute('id', 'close');
  close.innerHTML = 'x';

  const textModal = document.createElement('p');
  textModal.setAttribute('id', 'textModal');
  textModal.innerHTML = 'Are you sure you want to delete this post?';

  const btnDelete = document.createElement('button');
  btnDelete.setAttribute('id', 'btnDelete');
  btnDelete.innerHTML = 'Delete';

  const btnCancel = document.createElement('button');
  btnCancel.setAttribute('id', 'btnCancel');
  btnCancel.innerHTML = 'Cancel';

  modalContent.append(close, textModal, btnCancel, btnDelete);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Lo dejo por si se necesita
//   function hideModal() {
//     modal.style.display = 'none';
//   }

  close.addEventListener('click', () => {
    modal.remove();
  });

  btnCancel.addEventListener('click', () => {
    modal.remove();
  });

  btnDelete.addEventListener('click', () => {
    modal.remove();
    // Faltaría qué más hacer cuando seleccione delete
  });
};
